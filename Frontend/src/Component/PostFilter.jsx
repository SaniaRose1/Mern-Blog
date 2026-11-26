import PropTypes from 'prop-types'

export function PostFilter({ field , value, onChange }) {
 return (
 <div style={{backgroundColor:"lightgoldenrodyellow"  , color:"red" , fontSize:"20px" , fontWeight:"bold"}}>
 <label htmlFor={`filter-${field}`}>{field}: </label>
 <input
 type='text'
 name={`filter-${field}`}
 id={`filter-${field}`}
 value={value}
 onChange={(e) => onChange(e.target.value)}
  style={{height:"30px", width:"200px" , borderRadius:"20px"}}
 />
 </div>
 )
}
PostFilter.propTypes = {
 field: PropTypes.string.isRequired,
 value: PropTypes.string.isRequired,
 onChange: PropTypes.func.isRequired,
}