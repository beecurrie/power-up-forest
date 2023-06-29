import "./page.css";
export default function Home() {
    return (
        <div>
            <h1>Welcome To Power Up Forest</h1>
            <h6>A helpful time management application to help you with productivity and goal achievement</h6>
            <div className="box">
            <h5>Where would you like to start your journey?</h5>
                <a href="/signup">SIGN UP</a><br/><br/>
                <a href="/login">LOG IN</a>
            </div>
        </div>
    );
}