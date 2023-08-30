import React, { useState, useEffect } from "react";
import './HomeScreen.css'
import AddEvents from './AddEvents';
import Sidebar from './common/Sidebar'
import './App.css'
import { Outlet, Link } from "react-router-dom";

export default function HomeScreen(){

  const [keywordEntry, setKeywordEntry] = useState(false)
  return(

      <div>
      <Sidebar />
        {!keywordEntry ?
          <main>
            <div class="intro">
              <h1>JLP EFS</h1>
              <p>    Events that might impact the demand forecasting    </p>
              <Link to='/requirements' class="button">Create Events</Link>
            </div>
        </main>
        : <>
          <AddEvents />
        </>}
      </div>

  //     <CardComponent data={json[0]}/>
  //     {keys.map((d) => {
  // // {						console.log(json[d])}
  //         <CardComponent data={json[d]} />
  //     })}
  //     <Button onClick={postAllBranchesData}>POST </Button>

  )
}
