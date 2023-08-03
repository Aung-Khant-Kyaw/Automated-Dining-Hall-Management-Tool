
import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

var date = new Date().toLocaleDateString();

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <footer class="py-2 bg-primary fixed-bottom">
                    <div class="container">
                        <p class="m-0 text-center text-white">
                        Today date is {date}.
                        </p>
                    </div>
                </footer>
            </div>
    )}
}

export default Footer;