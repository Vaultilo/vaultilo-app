import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import {
  Control,
  Field,
  Input,
  Label,
  Textarea,
} from 'react-bulma-components/lib/components/form';
import { Button, Card, Content } from 'react-bulma-components';
import { POST_ICONFILE } from '../../utils/constants';
import generateUUID from '../../utils/generateUUID';
import { FilePicker } from 'react-file-picker';
import eye from '../../images/eye.png'
import hide from '../../images/hide.png'
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css'

class PostFormIcon extends Component {
  constructor(props) {
    super(props);

    const { post = {} } = props;

    this.state = {
      title: post.title || '',
      description: post.description || '',
      posts: [],
      privateKey: post.privateKey || '',
      keyStore: '',
      showPw:false,
      showPk:false
      
    };
  }

  buildFileSelector() {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('single', 'single');
    fileSelector.setAttribute('name', 'keystore');
    return fileSelector;
  }

  static propTypes = {
    userSession: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    post: PropTypes.object,
    type: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.loadPosts();
    const { post } = this.props;
    this.fileSelector = this.buildFileSelector();
  }

  loadPosts = async () => {
    const { userSession } = this.props;
    const options = { decrypt: false };

    const result = await userSession.getFile(POST_ICONFILE, options);

    if (result) {
      this.setState({ posts: JSON.parse(result) });
    }
    return null;
  };

  editPost = async () => {
    const options = { encrypt: false };
    const { title, description, posts } = this.state;
    const { history, userSession, username, post } = this.props;

    console.log(post);

    // for posts.json
    const params = {
      id: post.id,
      title,
      description,
    };

    const editedPostsForIndex = _.map(posts, (p) => {
      if (p.id === post.id) {
        return params;
      }

      return p;
    });

    try {
      await userSession.putFile(
        POST_ICONFILE,
        JSON.stringify(editedPostsForIndex),
        options,
      );
      //await userSession.putFile(`post-${post.id}.json`, JSON.stringify(detailParams), options)

      this.setState(
        {
          description: '',
          title: '',
        },
        () => {
          history.push(`/admin/${username}/posts`);
        },
      );
    } catch (e) {
      console.log(e.message);
    }
  }
   
   createPost = async () => {      
        const options={encrypt:false}
        const {history,userSession,username}=this.props
        const {title,description,posts,privateKey,keyStore}=this.state
        const id=generateUUID()
        //console.log(posts)

       
        const params={
            id,title,description,privateKey
        }
  
        try{
          console.log("fileContent",keyStore)
          await userSession.putFile(POST_ICONFILE,JSON.stringify([...posts,params]),options)
          await userSession.putFile(`ICON-${id}.txt`,keyStore,options)
          this.setState({
            title:'',
            description:''
          },()=> history.push(`/admin/${username}/posts`))
        }catch(e){
          console.log(e)
        }    
    }  

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { type } = this.props;
    this.toastResult("Saving the details",3000)
    return type === 'edit' ? this.editPost() : this.createPost();
  };
  handleCancel = () => {
    const { history } = this.props;
    history.push(`/`);
  };

  togglePw (){
    const {showPw}=this.state
    this.setState({showPw:!showPw})
  }

  togglePk (){
    const {showPk}=this.state
    this.setState({showPk:!showPk})
  }

  handleUpload=async (file)=>{
        const reader = new FileReader()
        const afterFileRead = (e) => {
          const text = e.target.result;
          console.log(text);
          this.setState({ keyStore: text });
        };
    
        reader.addEventListener(
          'load',
          function(e) {
            afterFileRead(e);
          }.bind(this),
        );
    
        reader.readAsText(file)
        const options={encrypt:true}
        const {history,userSession,username}=this.props
        await userSession.putFile('/test_file.txt',"Icon Keystore",options)
         var res=reader.result
        this.setState({keyStore:res})
        this.toastResult("File Upload Successful",1500)
  };

  toastResult(text,time){
    const CustomNotification = ({ title }) => {
      
      return <Button style={{ color:"Blue" }}>{title}</Button>
    }
    
    toaster.notify(() => <CustomNotification title={text} />,
                          {position:'top',duration:time}
            )
  }

  getKey = async () => {
    const options = { decrypt: true };
    const { userSession } = this.props;
    const keystore = await userSession.getFile('/test_file.txt', options);
    console.log('keystore-file:  ', keystore);
  };
   

      render() {
        const {showPw,showPk}=this.state
        return (
          <Card>
            <Card.Content>
            <Content>
                <FilePicker
                    onChange={FileObject => (this.handleUpload(FileObject))}
                    onError={errMsg => (console.log(errMsg))}
                >
                    <button>
                    Upload Keystore File
                    </button>
                </FilePicker>
                
                </Content>
                
              <Content>
            
                <form onSubmit={this.onSubmit} className="post-form">
                <Field>
                <Label>Name</Label>
                <Control kind="group">
                  <Input
                    name="title"
                    size="small"
                    onChange={this.onChange}
                    placeholder="Wallet Name"
                    value={this.state.title}
                  />
                  
                </Control>
              </Field>   
                  <Field>
        <Field kind="group"><Label>Password</Label>
                    <img src={showPw ? hide :eye} onClick={this.togglePw.bind(this)} style={{marginLeft:"10px" }}/>
                    </Field>
                    <Control>
                      <Input
                        name="description"
                        type={showPw ? "text": "password"}
                        size="small"
                        onChange={this.onChange}
                        placeholder="Enter the password"
                        value={this.state.description}
                      />
                    </Control>
                  </Field>
                  <Field>
                    <Field kind="group"> <Label>Private Key</Label>
                    <img src={showPk ? hide:eye} onClick={this.togglePk.bind(this)} style={{marginLeft:"10px" }}/>
                    </Field>
                    <Control>
                      <Input
                        name="privateKey"
                        type={showPk ? "text":"password"}
                        size="small"
                        onChange={this.onChange}
                        placeholder="Enter the private key"
                        rows={1}
                        value={this.state.privateKey}
                      />
                    </Control>
                  </Field>
                  <Field kind="group" >
                     <Control>
                       <Button onClick={this.handleCancel} size="small">Cancel</Button>
                     </Control>
                     <Control>
                       <Button
                         color="link"
                         type="submit"
                         size="small"
                        >
                          Submit
                      </Button>
                     </Control>
                   </Field>
                </form>
              </Content>
            </Card.Content>
            

          </Card>
        )
      }
    
  }
   


export default withRouter(PostFormIcon);
