//import react into the bundle
import React, { useState } from 'react'
import {createRoot} from 'react-dom/client'
import { Container, Row, Col } from 'react-bootstrap'
import ContactCard from './ContactCard';

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from './layout.js'

//
const root = createRoot(document.querySelector("#app"))

//render your react application
root.render(<Layout/>)

