import React, { useState, useEffect } from "react";
import "./Home.css";

export default function Home(){
return <div className="home">

{/* {card} */}

<div className="card">

{/* {card Header} */}

<div className="card-header">
    <div className="card-pic">
        <img src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
    </div>
    <h5>Ramesh</h5>

</div>
{/* {card image} */}
<div className="card-image">
    <img src="https://images.unsplash.com/photo-1724684410691-8530c765b6dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
</div>
{/* {card content} */}
<div className="card-content">
<span class="material-symbols-outlined">
favorite
</span>
<p>1 like</p>
<p>amazing</p>
</div>
{/* {add comment} */}
<div className="add-comment">
{/* <span class="material-symbols-outlined"></span> */}

<input type="text" placeholder="Add Comment" />
<button className="comment">post</button>
</div>
</div>
</div>

}

