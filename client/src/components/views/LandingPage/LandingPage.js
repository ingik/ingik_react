import { withRouter } from 'react-router-dom';
// import  { Card , CardMedia , CardContent , Typography , Button} from '@mui/material';

function LandingPage(props) {
    
    
    // const dispatch = useDispatch()
    
    // const [IsAuth,setIsAuth] = useState(Boolean)
    console.log('(landingPage)props : '+JSON.stringify(props))
    
    // useEffect(() => {
    //     dispatch(auth()).then(response => {
    //         console.log(response)
            
    //         setIsAuth(response.payload.isAuth)
    //     })
    // }, [])


    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
      </div>
    );
}

export default withRouter(LandingPage)
