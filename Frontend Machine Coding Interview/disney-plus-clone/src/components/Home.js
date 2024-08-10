import styled from "styled-components";
import bgImage from "../assets/images/home-background.png";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebaseConf";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);

    

    useEffect(() => {
        let recommends = [];
        let newDisneys = [];
        let originals = [];
        let trending = [];

        db.collection('movies').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                switch(doc.data().type){
                    case 'recommend':
                        console.log("added to recommends")
                        // recommends = [...recommends, { id: doc.id, ...doc.data() }]
                        recommends.push({ id: doc.id, ...doc.data() });
                        
                        break;
                    case "new":
                        console.log("added to new")
                        // newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
                        newDisneys.push({ id: doc.id, ...doc.data() });
                        break;
                    case 'original':
                        console.log("added to original")
                        // originals = [...originals, { id: doc.id, ...doc.data() }];
                        originals.push({ id: doc.id, ...doc.data() });
                        break;
                    case 'trending':
                        console.log("added to trending")
                        // trending = [...trending, { id: doc.id, ...doc.data() }];
                        trending.push({ id: doc.id, ...doc.data() });
                        break;
                }
            });
            // console.log(recommends)
            // console.log(newDisneys)
            // console.log(originals)
            // console.log(trending)
            
        dispatch(setMovies({
            recommend: recommends,
            newDisney: newDisneys,
            original: originals,
            trending: trending,
        })
    );
    });
    }, [userName]);
    // if(recommends.length > 0){
    //     console.log(recommends)
    // } else{
    //     console.log("epty")
    // }

    return(
        <Container>
            <ImgSlider />
            <Viewers />
            <Recommends />
            <NewDisney />
            <Originals />
            <Trending />
        </Container>
    ) 
}

const Container = styled.main`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);

    &:after{
        background: url(${bgImage}) center center / cover no-repeat fixed;
        content: "";
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }

`;

export default Home;