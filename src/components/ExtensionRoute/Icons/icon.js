import React from 'react'
import bitcoin_icon from './icon_bitcoin.png';
import ethereum_icon from './icon_ethereum.png';
import icon_icon from './icon_logo.png';
import ripple_icon from './icon_ripple.png';
import other_icon from './icon_other.png';
import default_icon from './icon_default.jpg'


export default function   Icon  (props) {
    const image =this.props.image
    if (image==="bitcoin"){
        return(
            {bitcoin_icon}
        )
    }
    if (image==="ethereum"){
        return(
            <img src={ethereum_icon}/>
        )
    }
    if (image==="icon"){
        return(
            <img src={icon_icon}/>
        )
    }
    if (image==="ripple"){
        return(
            <img src={ripple_icon}/>
        )
    }
    if (image==="other"){
        return(
            <img src={other_icon}/>
        )
    }

    return(
        <img src={default_icon}/>
    )

}