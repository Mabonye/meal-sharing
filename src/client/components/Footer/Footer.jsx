import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer>
            <div id="footer-container">
                <div>
                    <h3>Opening Time</h3>
                    <section>
                        <p>Tuesday - Saturday</p>
                        <p>10:00am - 08:00pm</p>
                    </section>

                    <section>
                        <p>Sunday - Monday</p>
                        <p>Off day</p>
                    </section>
                </div>
                <div>
                    <h3>Contact</h3>
                    <section>
                        <p><b>Location:</b> Viborg, Denmark</p>
                    </section>
                    <section>
                        <p><b>Phone:</b> 12345678</p>
                    </section>
                    <section>
                        <p><b>Email:</b> example@yahoo.com</p>
                    </section>
                </div>
                <div>
                    <section>
                        <p>Follow:</p>
                        <ul>
                            <li><a href="#"><img src="/Users/jemimamasamu/Desktop/meal-sharing/src/client/components/Footer/icons/facebook.png" alt="facebook" /></a></li>
                            <li><a href="#"><img src="/Users/jemimamasamu/Desktop/meal-sharing/src/client/components/Footer/icons/instagram.png" alt="instagram" /></a></li>
                            <li><a href="#"><img src="/Users/jemimamasamu/Desktop/meal-sharing/src/client/components/Footer/icons/linkedin.png" alt="linkedIn" /></a></li>
                            <li><a href="#"><img src="/Users/jemimamasamu/Desktop/meal-sharing/src/client/components/Footer/icons/twitter.png" alt="twitter" /></a></li>
                        </ul>
                    </section>
                </div>
            </div>

            <div className="copyright">
                <section>
                    <p>&copy; 2023 Delicious Meals</p>
                </section>
            </div>
        </footer>
    );
}

export default Footer;



