import React from "react";

function Hero() {
  return (
     <section className="container-fluid" id="supportHero">
         <div className="container">
         <div className="d-flex justify-content-between align-items-center py-5">
         <h4>Support Portal</h4>
          <a href="">Track Tickets</a>
         </div>
        </div>
        <div className="row p-5 m-3 gx-5">
           <div className="col-6 p-5 ">
            <h1 className="fs-3">Search for an answer or browse help topics to create a ticket </h1>
            <input placeholder="Eg: How do I open my account, How do i activate F&O..." className="mb-3"/>
            <br/>
            <a href="">Track account opening</a>
            <a href="">Track segment activation</a>
            <a href="">Intraday margins</a>
            <a href="">Kite user manual</a>

           </div>
          <div className="col-md-5 offset md-1 mt-5">
            <h1  className="fs-3">Featured</h1>
            <ol>
              <li><a href="">Current Takeovers and Delisting - January 2025</a></li>
              <li><a href="">Latest Intraday leverages - MIS & CO</a></li>
            </ol>
             
            

           </div>
        

        </div>
      </section>
  );
}

export default Hero;