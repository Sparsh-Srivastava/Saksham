import React from 'react';
import styles from './dashboard.module.css';
import Footer from '../footer/footer';
import { Formik, Form, Field, ErrorMessage } from "formik";
import Navbar from "../navbar/navbar";
function Dashboard(props) {
    return (
        <div>
            <Navbar/>
            <div className={styles.dashboard}>
                <h1>Your Dashboard</h1>
            </div>
            <Footer/>
        </div>
    );
}

export default Dashboard;