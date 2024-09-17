import express from 'express';
import axios from 'axios';


const app = express();

const Router=express.Router();
app.use(Router);


const fetchData = async () => {
    try {
        const response = await axios.get('https://api.cuvora.com/car/partner/cricket-data', {
            headers: {
                'apiKey': 'test-creds@2320'  // Add your apiKey header
            }
        });

        const data = response.data.data;
      // console.log(data);

     
        const winner= data.map((val)=>{
            const key = val.status.substring(0, 4) === val.t1.substring(0, 4) ? val.t1 : val.t2;
            const value= val.status.substring(0,4)===val.t1.substring(0,4)?parseInt(val.t1s.substring(0,3)):parseInt(val.t2s.substring(0,3));

            return {[key]:value};
       
        })
       // console.log( winner);
        
        const maxEntry = winner.reduce((maxEntry, current) => {
            const currentValue = Object.values(current)[0];
            //console.log(Object.values(current));
            const currentKey = Object.keys(current)[0];
            
            if (currentValue > maxEntry.value) {
                return { key: currentKey, value: currentValue };
            }
            return maxEntry;
        }, { key: null, value: -Infinity });




         console.log('Highest Score:', maxEntry.value, 'and Team name is:', maxEntry.key);
        

        let cnt=0;
        data.forEach(val => {
            if(parseInt(val.t1s.substring(0,3))+parseInt(val.t2s.substring(0,3))>300)
                cnt++;
        });
        console.log("Number Of Matches with total 300 Plus Score :", cnt);
    Router.get('/api',(req,res)=>{
        res.status(200).send({'(1) Highest Score': maxEntry.value, 'and Team name is': maxEntry.key,
            " (2) Number Of Matches with total 300 Plus Score ": cnt});
    })
    
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

fetchData();

app.listen(3200, () => {
    console.log('Server is running on port 3200');
});
