import "./Spinner.scss";

function Spinner() {
  return (
    <div className='spinner--container'>
      <div className='demo'>
        <div className='circle'>
          <div className='inner'></div>
        </div>
        <div className='circle'>
          <div className='inner'></div>
        </div>
        <div className='circle'>
          <div className='inner'></div>
        </div>
        <div className='circle'>
          <div className='inner'></div>
        </div>
        <div className='circle'>
          <div className='inner'></div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
