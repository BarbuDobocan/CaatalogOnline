import React from 'react';
import {Table, Button} from 'react-bootstrap';
import "./StudentFinalGrades.scss";



function StudentFinalGrades(props) {
    let semester = props.semester;
    let showButtons = props.showAverageButtonSem;
    let behaviorGradeId = false;
    let average = props.studentAllFinalGrades && props.studentAllFinalGrades.averages;
    return(
        <div>
        <Table responsive>
            <thead>
            <tr>
                <th>#MATERIA</th>
                <th>Semestrul I</th>
                <th>Semestrul II</th>
                <th>Finalul Anului</th>
            </tr>
            </thead>
            <tbody>
            {
                props.studentAllFinalGrades && props.studentAllFinalGrades.listGrades.map((item) => {
                   return(<tr>
                        <td>{item.cours.coursName}</td>
                       {
                           item.semI !== null ?
                               <td>{item.semI.grade}</td>
                                :
                               item.cours.id === 10 && semester === 1 ?
                                   <td>
                                           <Button onClick={props.showFinalGradeBehaviorModal}>Adauga medie</Button>
                                   </td>
                                   :
                                   <td> ... </td>
                       }
                       {
                           item.semII !== null ?
                               <td>{item.semII.grade}</td>
                               :
                               item.cours.id === 10 && semester === 2 ?
                                   <td>
                                   <Button onClick={props.showFinalGradeBehaviorModal}>Adauga medie</Button>
                                   </td>
                                   :
                                   <td> ... </td>
                       }
                       {
                           item.yearFinal !== null ?
                               <td>{item.yearFinal.grade}</td>
                               :
                               <td> ... </td>
                       }
                       {
                           item.cours.id === 10 && ((semester === 1 && item.semI) || (semester === 2 && item.semII))
                               ?
                               behaviorGradeId = true
                               :
                               null
                       }
                    </tr>)
                })
            }
            {
                props.studentAllFinalGrades && props.studentAllFinalGrades.averages &&
                    <tr>
                        <td className = {"professor-master-total-media"}>MEDIA GENERALA</td>
                        {
                            props.studentAllFinalGrades.averages.semI !== null ?
                                <td className = {"professor-master-total-media"}>{props.studentAllFinalGrades.averages.semI.grade}</td>
                                :
                                <td>...</td>
                        }
                        {
                            props.studentAllFinalGrades.averages.semII !== null ?
                                <td className = {"professor-master-total-media"}>{props.studentAllFinalGrades.averages.semII.grade}</td>
                                :
                                <td>...</td>
                        }
                        {
                            props.studentAllFinalGrades.averages.yearFinal !== null ?
                                <td className = {"professor-master-total-media"}>{props.studentAllFinalGrades.averages.yearFinal.grade}</td>
                                :
                                <td>...</td>
                        }
                    </tr>
            }
            <tr>
                <th></th>
                <th>
                    {
                        props.studentAllFinalGrades && props.studentAllFinalGrades.message !== null &&
                        props.studentAllFinalGrades.message.semIText !== null
                                 ?
                          <h6>{props.studentAllFinalGrades.message.semIText}</h6>
                            :
                        semester === 1 && showButtons.semI ?
                        <Button onClick={props.showTotalGradeModal}>
                            Incheie Media I
                        </Button>
                            :
                            null
                    }
                </th>
                <th>
                    {
                        props.studentAllFinalGrades && props.studentAllFinalGrades.message !== null &&
                        props.studentAllFinalGrades.message.semIIText !== null
                            ?
                            <h6>{props.studentAllFinalGrades.message.semIIText}</h6>
                            :
                        semester === 2 && showButtons.semII ?
                            <Button onClick={props.showTotalGradeModal}>
                                Incheie Media II
                            </Button>
                            :
                            null
                    }
                </th>
                <th>
                    {
                        props.studentAllFinalGrades && props.studentAllFinalGrades.message !== null &&
                        props.studentAllFinalGrades.message.finalText !== null
                            &&
                            <h6>{props.studentAllFinalGrades.message.finalText}</h6>
                    }
                </th>
            </tr>
            <tr>
                <th>
                </th>
                <th>
                    {
                        semester === 1 &&
                        props.studentAllFinalGrades &&
                        props.studentAllFinalGrades.averages.semI !== null
                            &&
                        <Button onClick={props.deleteStudentTG}>
                            Sterge Media
                        </Button>
                    }
                </th>
                <th>
                    {
                        semester === 2 &&
                        props.studentAllFinalGrades &&
                        props.studentAllFinalGrades.averages.semII !== null
                        &&
                        <Button onClick={props.deleteStudentTG}>
                            Sterge Media
                        </Button>
                    }
                </th>
                <th>
                </th>
            </tr>
            </tbody>
        </Table>
            {
                behaviorGradeId === true &&
                ((semester === 1 && !average.semI) || (semester === 2 && !average.semII)) &&
                <Button onClick={props.deleteBehaviorGrade}>
                    Sterge Media la Purtare
                </Button>
            }
        </div>
    )
}

export default StudentFinalGrades;
