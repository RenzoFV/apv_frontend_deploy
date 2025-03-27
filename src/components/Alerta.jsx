import React from 'react'

const Alerta = ({alerta}) => {
    return (
        
        <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-white text-center py-3 rounded-xl uppercase font-bold`}>
            {alerta.msg}
        </div>
    )
}

export default Alerta