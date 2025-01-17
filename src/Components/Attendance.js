import React, { useState, useEffect } from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import {getContent,getKeys,getCookie,getGrades} from '../Api/Api'
import { Link } from 'react-router-dom'
import {cardColorTheme} from './ColorTheme'
import { Progress } from 'react-sweet-progress'
import "react-sweet-progress/lib/style.css"
import Sidenav from './Sidenav'
import BottomNav from './BottomNav'
import Nav from './Nav'

const Attendance = ( match ) => {

  const [content,setContent]=useState()
  const [styles,setStyles]=useState({transform:0})
  const [result,setResult]=useState()
  const grades = []

  const getRating=(grades)=> {
		let gradeArr = ["F", "C", "C+", "B", "B+", "A", "A+", "O"];
		let maxScore = 7 * grades.length
		const scoreArr = grades.map(grade => gradeArr.indexOf(grade));
		var sum = scoreArr.reduce(function (a, b) {
			return a + b;
		}, 0);
		return (sum / maxScore * 5).toFixed(1)
	}

  //test feature
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const cookie = localStorage.getItem('cookie');
  
  if(theme === null)localStorage.setItem('theme', 'Default')

  useEffect(()=>{
    const getContentData = async()=>{
      setContent(await getContent(cookie))
    }  
    getContentData()
    const getKey=async()=>{
      await getKeys(cookie)
    }
    getKey()
    const getGrade=async()=>{
      setResult(await getGrades(cookie))
    }
    getGrade()
  },[])

  result&&result.Grades.map((x) => grades.push(x["Grade"]))
  const rating = getRating(grades)
  
  localStorage.setItem('rate',rating)

  // if(timetable.length)
  //   localStorage.setItem('batch',timetable[0].Student_Details[2]['Batch:'])

  const palette = cardColorTheme[localStorage.getItem('theme')]
  return (
    <div style={Object.assign({},palette.background, {minHeight: '100vh'})}>
      {(match.isFragment)?'':<Nav title='Attendance'/>}
      {content&&content[0]?<div className='main-container' style={Object.assign({}, {paddingBottom: '18px'})}>
        <div className="row" style={{margin: '0'}}>
          {content && content[1]['Attendance'].map((x, key) =>
            <div key={key} className="col s12 m6 l3">
              <div className="card" style={Object.assign({}, palette.fontColor, palette.frontCard, parseInt(x['%']) < 50 ? palette.danger : parseInt(x['%']) < 75 ? palette.warning : parseInt(x['%']) < 100 ? palette.safe : palette.safest)}>
                <div className="card-content" style={Object.assign({}, palette.fontColor, {padding: '1px 8px 4px 8px'})}>
                  <h5 className="center-align truncate">{x['Course Title']}</h5>
                  <div className='center-align'><span>{x['Course Code']}</span></div>
                </div>
                <div className="card-action" style={Object.assign({}, palette.fontColor, {backgroundColor: 'rgba(0,0,0,0)'} )}>
                  <div className='row'>
                    <div className='col s3 center' style={palette.fontColor}><span>Conducted</span><br/><span>{parseInt(x['Hours Conducted'])}</span></div>
                    <div className='col s3 center' style={palette.fontColor}><span>Present </span><br/><span>{parseInt(x['Hours Conducted']) - parseInt(x['Hours Absent'])}</span></div>
                    <div className='col s2 center' style={palette.fontColor}><span>Absent</span><br/><span>{x['Hours Absent']}</span></div>
                    <div className='col s2 center' style={palette.fontColor}><span className='bold'>Bunk</span><br/><span>{(parseInt(x['Hours Conducted']) - parseInt(x['Hours Absent'])) - parseInt(x['Hours Conducted'])*0.75}</span></div>
                    <div className='col s2 center' style={palette.fontColor}><span>{x["Room No"]}</span><br/><span className='hide-on-med-and-up'>-</span></div>
                  </div>
                  <div className='row' style={{marginBottom: '0'}}>
                    <Progress
                      className='col s10'
                      style={{color: 'white'}}
                      percent={x['%']}
                      theme={{
                        success: {
                          symbol:' ',
                          color: '#FCC709'
                        },
                        active: {
                          symbol:' ',
                          color: '#6970DD',
                        },
                        default: {
                          symbol: '😱',
                          color: '#4565D3'
                        }
                      }}
                    />
                    <div className='col s2 percent' style={palette.fontColor}>{x['%']}%</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>:<center><Loader
              type="ThreeDots"
              color="black"
              height={50}
              width={50}
            /></center>}
      <BottomNav/>
    </div>
  );
}

export default Attendance;
