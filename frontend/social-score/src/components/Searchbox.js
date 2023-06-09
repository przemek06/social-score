import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBox = ({text, onTextChange, onSearch}) => {
  return (
    <Form inline style={{marginBottom: 40}}>
    <div style={{display: 'flex', flexDirection: "row", alignItems: 'center'}}>
      <FormControl type="text" placeholder="Szukaj" className="mr-sm-2" style={{ height: '50px', marginRight: 40}} onChange={onTextChange} value={text}/>
      <div>
      <Button variant="primary" size='lg' onClick={onSearch}>Szukaj</Button>
      </div>
    </div>
    </Form>
  );
};

export default SearchBox;