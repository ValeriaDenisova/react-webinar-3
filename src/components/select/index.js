import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Select(props) {
  const onSelect = e => {
   
    for(let i = 0; i < props.options.length; i++){
      if(e.target.value == props.options[i].value){
        props.onChange(e.target.value, i);
      }
    }
    
  };


  return (
    <select className="Select" value={props.value} onChange={onSelect}>
      {props.selected !== undefined && <option key={props.selected.value} value={props.selected.value}> {props.selected.title}</option>}
      {props.options.map((item, index) => (
        props.selected !== undefined && item.title !== props.selected.title && <option key={item.value} value={item.value} id={`${index}`}>
          {item.title}
        </option>

))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
    }),
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  onChange: () => {},
};

export default memo(Select);
