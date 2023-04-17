require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require('http');
const https = require('https');
const fs = require('fs');
const cert = process.env.SSL_CERT;
const priv_key = process.env.SSL_PRIV_KEY;


//Routes
const calenderRoutes = require("./routes/calender");
const sidebarRoutes = require("./routes/sidebar");
const authRoutes = require("./routes/auth");
const stripeRoutes = require("./routes/stripe");
const dragRoutes = require("./routes/drag");
const userRoutes = require("./routes/user");
const packageRoutes = require("./routes/package");
const menuDropdownRoutes = require("./routes/menuDropdown");
const locationRoutes = require("./routes/location");
const categoryRoutes = require("./routes/category");
const documentManagementRoutes = require("./routes/documentManagement");
const plancategoryRoutes = require("./routes/planCategory");
const planRoutes = require("./routes/plan");
const officerRoutes = require("./routes/officer");
const formRoutes = require("./routes/form");
const evacuationRoutes = require("./routes/evacuation");
const releaseFormPartBRoutes = require("./routes/releaseFormPartB");
const releaseFormPartCRoutes = require("./routes/releaseFormPartC");
const uploadTemplateRoutes = require("./routes/uploadTemplate");
const ticketingRoutes = require("./routes/ticketing");
const fireProtectionReportRoutes = require("./routes/fireProtectionReport");
//Connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}).then(()=>{
    console.log('DATA CONNECTED');
}).catch((err)=>{
    console.log(err);
})

app.use(express.static('uploads')); 
app.use('/uploads', express.static('uploads'));
app.use(express.static('uploads/location')); 
app.use('/uploads/location', express.static('uploads/location'));
app.use(express.static('uploads/documents')); 
app.use('/uploads/documents', express.static('uploads/documents'));
app.use(express.static('uploads/plan')); 
app.use('/uploads/plan', express.static('uploads/plan'));
app.use(express.static('uploads/sidebar')); 
app.use('/uploads/sidebar', express.static('uploads/sidebar'));
app.use(express.static('uploads/calender')); 
app.use('/uploads/calender', express.static('uploads/calender'));
app.use(express.static('uploads/releaseform')); 
app.use('/uploads/releaseform', express.static('uploads/releaseform'));
app.use(express.static('uploads/template')); 
app.use('/uploads/template', express.static('uploads/template'));
app.use(express.static('uploads/ticketing')); 
app.use('/uploads/ticketing', express.static('uploads/ticketing'));

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use('/api',calenderRoutes);
app.use('/api',sidebarRoutes);
app.use('/api',authRoutes);
app.use('/api',stripeRoutes);
app.use('/api',dragRoutes);
app.use('/api',userRoutes);
app.use('/api',packageRoutes);
app.use('/api',menuDropdownRoutes);
app.use('/api',locationRoutes);
app.use('/api',categoryRoutes);
app.use('/api',documentManagementRoutes);
app.use('/api',plancategoryRoutes);
app.use('/api',planRoutes);
app.use('/api',officerRoutes);
app.use('/api',formRoutes);
app.use('/api',evacuationRoutes);
app.use('/api',releaseFormPartBRoutes);
app.use('/api',releaseFormPartCRoutes);
app.use('/api',uploadTemplateRoutes);
app.use('/api',fireProtectionReportRoutes);
//app.use('/api',ticketingRoutes);

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});

