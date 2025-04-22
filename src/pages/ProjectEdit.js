import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Layout from "../components/Layout";

function ProjectEdit() {
    const [id, setId] = useState(useParams().id);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        axios.get(`/api/projects/${id}`)
            .then(function (response) {
                let project = response.data;

                setName(project.name);
                setDescription(project.description);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })

                console.log(error);
            })
    }, []);

    const handleSave = () => {
        setIsSaving(true);

        axios.patch(`/api/projects/${id}`, {
            name: name,
            description: description
        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Project updated successfully!',
                showConfirmButton: false,
                timer: 1500
            })

            setIsSaving(false);
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })

            setIsSaving(false);
        });
    };

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Edit Project</h2>
                <div className="card">
                    <div className="card-header">
                        <Link className="btn btn-outline-info float-right" to="/">View All Projects</Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input className="form-control"
                                        id="name"
                                        value={name}
                                        type="text"
                                        name="name"
                                        onChange={(event) => {setName(event.target.value)}}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control"
                                            id="description"
                                            value={description}
                                            onChange={(event) => {setDescription(event.target.value)}}
                                            rows="3"
                                            name="description"
                                ></textarea>
                            </div>
                            <button className="btn btn-outline-success mt-3"
                                    disabled={isSaving}
                                    onClick={handleSave}
                                    type="button"
                            >
                                Update Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectEdit;