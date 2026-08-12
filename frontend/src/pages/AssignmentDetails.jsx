import { useNavigate, useParams } from "react-router"
import { getAssignmentByID, deleteAssignmentByID } from "../services/functions/lesson"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"


function AssignmentDetails() {
    const [thisAssignment, setThisAssignment] = useState({
        title: "",
        instructions: "",
        instructionsFile: "",
        questions: [],
        dueDate: "",
        lesson: ""
    })
    const { user } = useAuth()
    const navigate = useNavigate()
    const { assignmentId } = useParams()

    async function loadThisAssignment() {
        try {
            const Assignment = await getAssignmentByID(assignmentId)
            setThisAssignment(Assignment.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadThisAssignment()
    }, [])

    async function handleDelete(event) {
        const assignmentIdToDelete = event.target.id
        const lessonId = event.target.name
        try {
            await deleteAssignmentByID(assignmentIdToDelete)
            navigate("/assignments/" + lessonId)
        } catch (err) {
            console.log(err)
        }
    }

    function handleEdit(event) {
        navigate("/assignments/edit/" + event.target.id)
    }
    const isOwner =
        user &&
        thisAssignment.lesson?.creactedBy &&
        user._id.toString() === thisAssignment.lesson.creactedBy.toString()

    return (
        <>
            <div>Assignment Details</div>

            {thisAssignment.title !== "" ? (
                <>
                    <p>ID: {thisAssignment._id}</p>
                    <p>Title: {thisAssignment.title}</p>
                    <p>Instructions: {thisAssignment.instructions}</p>
                    {thisAssignment.instructionsFile && (
                        <p>Instructions File: <a href={thisAssignment.instructionsFile} target="_blank" rel="noreferrer">{thisAssignment.instructionsFile}</a></p>
                    )}
                    <p>Questions:</p>
                    <ol>
                        {thisAssignment.questions.map((one) => (
                            <li key={one._id}>
                                <p>{one.questionText}</p>
                                <p>{one.questionType}</p>
                                <p>{one.options}</p>
                                {isOwner && <p>{one.correctAnswer}</p>}
                            </li>
                        ))}
                    </ol>
                    <p>Due Date: {new Date(thisAssignment.dueDate).toLocaleDateString()}</p>

                    {isOwner && (
                        <>
                            <button id={thisAssignment._id} name={thisAssignment.lesson._id} onClick={handleDelete}>
                                Delete Assignment
                            </button>
                            <button id={thisAssignment._id} onClick={handleEdit}>
                                Edit Assignment
                            </button>
                        </>
                    )}
                </>
            ) : (
                <>Loading</>
            )}
        </>
    )
}


export default AssignmentDetails
