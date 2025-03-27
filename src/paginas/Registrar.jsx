import {useState} from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'


const Registrar = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({msg: 'Todos los campos son obligatorios', error:true})
            return;
        }
        if(password !== repetirPassword){
            setAlerta({msg: 'Las contraseñas no coinciden', error:true})
            return;
        }

        if(password.length<6){
            setAlerta({msg: 'La contraseña debe tener al menos 6 caracteres', error:true})
            return;
        }
        setAlerta({})

        //Crear un perfil en la api
        try{
            await clienteAxios.post('/veterinarios', {
                nombre,
                email,
                password
            })
            setAlerta({msg: 'Usuario creado correctamente, revisa tu email', error:false})
        }catch(error){
            //error.response.data.msg es el mensaje que enviamos desde la api
            setAlerta({msg:error.response.data.msg, error:true})
        }

    }

    const {msg} = alerta

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>Crea tu Cuenta y Administra tus <span className='text-black'>Pacientes</span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {msg && <Alerta 
                    alerta={alerta}
                />}
                <form onSubmit={handleSubmit}>
                    <div className='my-5'>
                            <label htmlFor=""className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
                            <input value={nombre} onChange={e=>setNombre(e.target.value)} type="text" placeholder='Ingresa tu nombre'  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'/>
                    </div>

                    <div className='my-5'>
                        <label htmlFor=""className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder='Ingresa tu email'  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'/>
                    </div>

                    <div className='my-5'>
                        <label htmlFor=""className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder='Ingresa tu password'  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'/>
                    </div>

                    <div className='my-5'>
                        <label htmlFor=""className='uppercase text-gray-600 block text-xl font-bold'>Repetir Password</label>
                        <input value={repetirPassword} onChange={e=>setRepetirPassword(e.target.value)} type="password" placeholder='Repite tu password'  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'/>
                    </div>

                    <input type="submit" value="Crear Cuenta" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer hover:bg-indigo-800 md:w-auto'/>
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link className='block text-center my-5 text-gray-500' to="/">¿Ya tienes una cuenta? <span className='font-bold text-black hover:underline'>Inicia Sesión</span></Link>
                    <Link className='block text-center my-5 text-gray-500 hover:text-black ' to="/olvide-password">Olvidé mi Password</Link>
                </nav>
            </div>

        </>
    )
}

export default Registrar