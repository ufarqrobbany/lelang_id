import { Input } from "./style";

const InputGroup = ({ label, name, type, value, handleChange, valueToggle, handleToggle, disabled, width }) => {
    return (
        <div className="mb-4" style={{ width: width }}>
            <label className="block ml-1 mb-2 text-sm">{label}</label>
            <div className="flex flex-row">
                {
                    type === 'password' ?
                        <>
                            <Input required disabled={disabled} type={valueToggle ? 'text' : 'password'} style={{ borderRight: "none", borderRadius: "0.5rem 0 0 0.5rem" }} name="password" onChange={handleChange} value={value} />
                            <button type="button" className="toggle-pass border border-l-0 rounded-r-lg text-slate-500" style={{ padding: "11px 14px", borderColor: "#393939" }} onClick={handleToggle}>
                                {valueToggle ? <FaEyeSlash style={{ color: "#393939" }} /> : <FaEye style={{ color: "#393939" }} />}
                            </button>
                        </>
                        :
                        <Input required type={type} disabled={disabled} name={name} onChange={handleChange} value={value} />
                }
            </div>
        </div>

    )
}

export default InputGroup;