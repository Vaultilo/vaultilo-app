import React,{Component} from 'react';
import '../../styles/PasswordStrength.css';
import zxcvbn from 'zxcvbn';

class PasswordStrength extends Component {

    PasswordLabel = (strength) => {

        switch (strength.score) {
          case 0:
            return 'Very Weak';
          case 1:
            return 'Weak';
          case 2:
            return 'Fair';
          case 3:
            return 'Good';
          case 4:
            return 'Strong';
          default:
            return 'Weak';
        }
      }


    render() {
        const {password} =this.props
        const pwStrength = zxcvbn(password);
      return (
        <div className="password-strength-meter">
         <br />
         <progress className={`col-12 password-strength-meter-progress strength-${this.PasswordLabel(pwStrength)}`}
          value={pwStrength.score}
          max="4"
        />
        <label
          className="password-strength-meter-label"
        >
        {password && (
            <>
               {this.PasswordLabel(pwStrength)}
            </>
          )
        }
        </label>
        </div>
      );
    }
  }
  
  export default PasswordStrength;