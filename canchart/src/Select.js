export function Radio(props) {
    const { name, value, children, checked, onChange } = props;

    return (
        <div className='row subaxis-center'>
            <input 
                type='radio' name={name} 
                value={value}
                style={{ width : '18px', height : '18px' }}
                defaultChecked={checked}
                onChange={(e)=>onChange(value)}
            ></input>
            <div style={{width:'5px'}}></div>
            <div className='undraggable'>{children}</div>
        </div>
    );
}

export function Check(props) {
    const { children, onChange, checked } = props;
    return (
        <div className='row subaxis-center'>
          <input 
            type='checkbox'
            checked={checked}
            style={{ width : '18px', height : '18px' }}
            onChange={(x)=>onChange(x.target.checked)}
        ></input>
          <div className='undraggable'>{children}</div>
        </div>
    );
}

export function TextInput(props) {
    const { title, caption, value, onChange } = props

    return (
        <div className='column undraggable'>
            <div className='row' style={{ margin : '2px', 'fontSize' : '14px' }}>{caption}</div>
            <div className='row' style={{ height : '20px' }}>
                <input
                    onChange={ (e)=>onChange(e.target.value) }
                    value={value}
                    style={{
                        flex: '1', height: '100%', width: '100%', 
                        padding : '0px 5px'
                    }}
                ></input>
            </div>
        </div>
    )
}