import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'
import logo from "../../images/logo.png"
import three from "../../images/3.jpg"
import onevid from "../../images/1.m4v"
import twovid from "../../images/2.m4v"
import "../style/Signup.css"


const Signup = () =>{

    const history = useHistory()
    const[email, setEmail] = useState("")

    const validateData = () =>{
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        {
          return M.toast({html: "Invalid email",classes:"#f44336 red"})
        }
        history.push("/step1")
    }

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);
      });
    return (
        <div className="screen">
    <div className = "signup-screen">
        <div className = "signup-bg">
            <img className = "signup-logo" src = {logo} alt = "" />
            <button className = "signup-btn #f44336 red"  onClick={()=>{history.push('/signin')}}>
                Sign In
            </button>
            <div className = "gradient" />
            <div className = "signup-body">
            <div className='signup-mycard'>
            <div className='signup-card signup-auth-card' >
                    <h1>Unlimited movies, TV shows and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                <div className = "signup-input">
                    <form>
                        <input type = "email" placeholder = " Email address"  value={email}
                        onChange={(e)=>setEmail(e.target.value)} />
                        <button className = "btn-get-started #f44336 red" onClick={()=>validateData()} >
                        Get Started   
                        </button>
                    </form>

                </div>
                </div>
                </div>
            </div>
            </div>
           
            
           
        </div>
        <section class="style-cards">
        <div class="card-0">
            <img src="https://occ-0-6071-3647.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVxdX2WnFSp49eXb1do0euaj-F8upNImjofE77XStKhf5kUHG94DPlTiGYqPeYNtiox-82NWEK0Ls3CnLe3WWClGdiJP.png?r=5cf"  alt="Netflix Mobile" />
            <div class="desc-0">
                <h1>Create profiles for children.</h1>
                <h3>Send children on adventures with their favourite characters in a space made just for them—free with your membership.</h3>
            
            </div>
            </div>
        
        <div class="card-1">
            <div class="desc-1">
                <h1>Enjoy on your TV.</h1>
                <h3>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</h3>
            </div>
            <div className="card-1-bg">
            <video class="video-1" autoplay="" playsinline="" muted="" loop=""><source src={onevid} type="video/mp4" />
            </video>
            </div>
            
        </div>
        <div class="card-2">
            <img src={three} alt="Netflix Mobile" />
            <div class="desc-2">
                <h1>Download your shows to watch offline.</h1>
                <h3>Save your favourites easily and always have something to watch.</h3>
            </div>
        </div>
        <div class="card-3">
            <div class="desc-3">
                <h1>Watch everywhere.</h1>
                <h3>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</h3>
            </div>
            <div className="card-3-bg">
            <video class="video-2" autoplay="" playsinline="" muted="" loop=""><source src={twovid} type="video/mp4" />
                </video>
            </div>
        </div>
    </section>

    <section class="lastsec">
        <div class="faq">
            <h1>Frequently Asked Questions</h1>
            <ul class="collapsible questions">
    <li>
      <div class="collapsible-header">What is Netflix?</div>
      <div class="collapsible-body">
          <p>Netflix is a streaming service that offers a wide variety of award-winning TV shows,
               movies, anime, documentaries and more – on thousands of internet-connected devices.</p>
          <p>
            You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price.
             There's always something new to discover, and new TV shows and movies are added every week!
        </p></div>
    </li>
    <li>
      <div class="collapsible-header">How much does Netflix cost?</div>
      <div class="collapsible-body">
          <p>
          Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 199 to ₹ 799 a month. No extra costs, no contracts.
          </p>
      </div>
    </li>
    <li>
      <div class="collapsible-header">Where can I watch?</div>
      <div class="collapsible-body">
          <p>
          Watch anywhere, anytime, on an unlimited number of devices.
           Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal
         computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
         </p>
         <p>
            You can also download your favourite shows with the iOS, Android, or Windows 10 app. 
            Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.
          </p>
      </div>
    </li>
    <li>
      <div class="collapsible-header">How do I cancel?</div>
      <div class="collapsible-body">
          <p>
          Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. 
          There are no cancellation fees – start or stop your account anytime.
          </p>
      </div>
    </li>
    <li>
      <div class="collapsible-header">What can I watch on Netflix?</div>
      <div class="collapsible-body">
          <p>
          Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.
          </p>
      </div>
    </li>
    <li>
      <div class="collapsible-header">Is Netflix good for kids?</div>
      <div class="collapsible-body">
          <p>
          The Netflix Kids experience is included in your membership to give parents
           control while kids enjoy family-friendly TV shows and films in their own space.
          </p>
          <p>
          Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of 
          content kids can watch and block specific titles you don’t want kids to see.
          </p>
      </div>
    </li>
  </ul>
            <p style={{color:"white", margin:"10px"}}>Ready to watch? Enter your email to create or restart your membership.</p>
            <div className = "signup-input">
                    <form>
                        <input type = "email" placeholder = " Email address"  value={email}
                        onChange={(e)=>setEmail(e.target.value)} />
                        <button className = "btn-get-started #f44336 red" onClick={()=>validateData()} >
                        Get Started   
                        </button>
                    </form>

                </div>
        </div>
    </section>


    <footer class="footer">
        <p>Questions? Call 000-800-040-1843</p>
        <div class="row">
            <div className="col s3 m3 l3" style={{textAlign:"left"}}>
            <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Investor Relations</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Speed Test</a></li>
            </ul>
            </div>
            <div className="col s3 m3 l3">
            <ul>
                <li><a href="#">Help Centre</a></li>
                <li><a href="#">Jobs</a></li>
                <li><a href="#">Cookie Preferences</a></li>
                <li><a href="#">Legal Notices</a></li>
            </ul>
            </div>
            <div className="col s3 m3 l3">
            <ul>
                <li><a href="#">Account</a></li>
                <li><a href="#">Ways to Watch</a></li>
                <li><a href="#">Corporate Information</a></li>
                <li><a href="#">Only on Netflix</a></li>
            </ul>
            </div>
            <div className="col s3 m3 l3">
            <ul>
                <li><a href="#">Media Centre</a></li>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Contact Us</a></li>
                
            </ul>
            </div>
        </div>
    </footer>
    </div>
    )
}

export default Signup