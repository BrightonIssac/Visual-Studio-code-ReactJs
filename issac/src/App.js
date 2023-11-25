import { useState,useEffect } from 'react';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import AddItem from "./AddItem";
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';


function App() {
  const API_URL='http://localhost:3500/items';
  const [items, setItems]=useState([]);

    const [search,setSearch]=useState('');
    const [newItem,setNewItem]=useState('');
    const [fetchError,setFetchError]=useState(null);
    const [isLoading,setIsLoading]=useState(true);

    useEffect(()=> {
      const fetchItems = async() => {
        try{
        const response= await fetch(API_URL);
        if(!response.ok) throw Error("Data Not received")
        console.log("aftewr fewtcxhing");
        console.log(response);
        const listItems=await response.json();
        console.log("Aftewr listitewms swetting");
        console.log(listItems);
        setItems(listItems);
        setFetchError(null)
        }
        catch(err){
          setFetchError(err.message)
          //console.log(err.stack);
        }
        finally{
          setIsLoading(false);
        }
            }
            setTimeout(()=>{
              (async () => await fetchItems())()
            },2000)
      console.log("inside use effect");
     
    },[])

    const addItem = async(item) => {
      console.log("Insidsew")
      console.log(item)
      const id=items.length ? items[items.length-1].id +1 : 1;
      const addNewItem={id,checked: false,item: item}
      const listItems=[...items,addNewItem]
      setItems(listItems)
      console.log(items)
      const postOptions ={
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addNewItem)
      }
      const result=await apiRequest(API_URL,postOptions)
      if(result) setFetchError(result)

    }
  
  const handleCheck= async(id)=>
  {
    const listItems=items.map((j) => j.id===id ? {...j,checked: !j.checked} : j )
    setItems(listItems)

    const myItem= listItems.filter(i =>i.id===id)
    const updateOptions ={
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }
    const reqUrl=`${API_URL}/${id}`
    const result=await apiRequest(reqUrl,updateOptions)
    if(result) setFetchError(result)


    
  }

  const handleDelete = async(id) => {
    const listItems=items.filter((k) => k.id !== id)
    setItems(listItems)
    

    const deleteOptions ={
      method: 'DELETE'
    }
    const reqUrl=`${API_URL}/${id}`
    const result=await apiRequest(reqUrl,deleteOptions)
    if(result) setFetchError(result)


  }
  const handleSubmit= (e) => {
    e.preventDefault()
    if(!newItem) return;
    //console.log(newItem)
    addItem(newItem)
    setNewItem('')
  }
  

  return (
    <div >
      <Header />
      <AddItem 
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      
      />
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading...</p>}
        {fetchError && <p> {`Error: ${fetchError}`}</p>}
      {!isLoading && !fetchError && <Content 
      items={items.filter(i=> ((i.item).toLowerCase()).includes(search.toLowerCase()))}
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      />}
      </main>
      <Footer 
        length= {items.length}
      />
    </div>
  );
}

export default App;
