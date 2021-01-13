
import LOGIN from './components/Ingreso/_Login'
import BASE_ADMINISTRADOR from './components/Administrador/Base/_Base'

const  App = () => {

  return (
    <div>
       
        {localStorage.getItem('S') ? (
          <BASE_ADMINISTRADOR/>
        ):(
          <LOGIN/>
        )}
        
    </div>
  );
}

export default App;
