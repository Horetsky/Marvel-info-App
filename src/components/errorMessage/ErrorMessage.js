import errorImg from './error.gif'

const ErrorMessage = () => {
    return (
        <img src={errorImg} style={{display: "block", with: "250px", height: "250px", margin: "0 auto"}} alt="error"/>
    )
}

export default ErrorMessage;