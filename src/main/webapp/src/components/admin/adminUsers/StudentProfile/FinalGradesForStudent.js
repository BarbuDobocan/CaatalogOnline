import React from 'react';
import {Button, Table} from "react-bootstrap";

function FinalGradesForStudent(props){
    return(
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
                    props.studentAllFinalGrades && props.studentAllFinalGrades.listGrades && props.studentAllFinalGrades.listGrades.map((item) => {
                        return(<tr>
                            <td>{item.cours.coursName}</td>
                            {
                                item.semI !== null ?
                                    <td>{item.semI.grade}</td>
                                        :
                                        <td> ... </td>
                            }
                            {
                                item.semII !== null ?
                                    <td>{item.semII.grade}</td>
                                        :
                                        <td> ... </td>
                            }
                            {
                                item.yearFinal !== null ?
                                    <td>{item.yearFinal.grade}</td>
                                    :
                                    <td> ... </td>
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
                </tbody>
            </Table>
    )
}

export default FinalGradesForStudent;
