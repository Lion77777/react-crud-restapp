import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function ProjectList() {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        fetchProjectList();
    }, []);

    const fetchProjectList = () => {
        axios.get('/api/projects')
            .then(function (response) {
                setProjectList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if(result.isConfirmed) {
                axios.delete(`/api/projects/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Project deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        fetchProjectList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    };

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Project Manager</h2>
                <div className="card">
                    <div className="card-header">
                        <Link className="btn btn-outline-primary" to="/create">Create New Project</Link>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th width="240">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectList.map((project, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{project.name}</td>
                                            <td>{project.description}</td>
                                            <td>
                                                <Link className="btn btn-outline-info mx-1"
                                                        to={`/show/${project.id}`}
                                                >
                                                    Show
                                                </Link>
                                                <Link className="btn btn-outline-success mx-1"
                                                        to={`/edit/${project.id}`}
                                                >
                                                    Edit
                                                </Link>
                                                <button className="btn btn-outline-danger mx-1"
                                                        onClick={() => handleDelete(project.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectList;