import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function ProjectCreate() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);

        axios.post('/api/projects', {
            name: name,
            description: description
        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Project saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })

            setIsSaving(false);
            setName('');
            setDescription('');
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
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New Project</h2>
                <div className="card">
                    <div className="card-header">
                        <Link className="btn btn-outline-info float-right" to="/">View All Projects</Link>
                    </div>
                    <div className="card-body">
                        <form>
                        
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input className="form-control"
                                        onChange={(event) => {setName(event.target.value)}}
                                        value={name}
                                        type="text"
                                        id="name"
                                        name="name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control"
                                            value={description}
                                            onChange={(event) => {setDescription(event.target.value)}}
                                            id="description"
                                            rows="3"
                                            name="description"
                                ></textarea>
                            </div>
                            <button className="btn btn-outline-primary mt-3"
                                    disabled={isSaving}
                                    onClick={handleSave}
                                    type="button"
                            >
                                Save Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectCreate;