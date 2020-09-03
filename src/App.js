import React,{useEffect,useState}from 'react';
import {Button,Table} from 'antd';
import axios from 'axios';
import './App.css';
function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [send,getData] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.post('https://api.globus.furniture/forex');
      const arr = [
            {
              key: 0,
              title: 'key',
              date: 'date',
              previous: 'previous',
              value: 'value',
            }
      ]
      if(result){
            Object.keys(result.data).map((key,index) => (
              arr[index] = {
                key: index,
                title: key,
                date: result.data[key].date,
                previous: result.data[key].previous,
                value: result.data[key].value,
              }
            ))
      }
      setData(arr)
      setIsLoading(false);
    };
    fetchData()
  }, [send]);
  return (
    <div className="App">
      
        { 
        isLoading ? (
          <div className="loading">Loading ...</div>
        ) :(
          <Table
            columns={
              [
                {
                  title: 'title',
                  dataIndex:'title' ,
                },
                {
                  title: 'date',
                  dataIndex:'date' ,
                },
                {
                  title: 'previous',
                  dataIndex:'previous',
                },
                {
                  title: 'value',
                  dataIndex:'value',
                }
              ]
            }
            dataSource={data}
            bordered
          />
        )
          
        }
       <Button type="primary" onClick={() =>
          getData(!send)
        }>update</Button>
    </div>
  );
}

export default App;
