import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { logout, User, reset } from 'src/app/state_management/user/authSlice';
import { RootState } from 'src/app/store';
import { createProject, getAllProjects, getProject, updateProject, deleteProject, reset__project } from 'src/app/state_management/project/projectSlice';

function Project({}) {

    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeProject} : any = useAppSelector((state) => state.project)
    const {user} : any = useAppSelector((state : RootState) => state.auth);

    return (
    <div>
        <section>
            <h2> {activeProject.projectName} </h2>
        </section>
        <section>
            <h3> Long Term Goals </h3>
        </section>
        <section>
            <p>
                <button> Add New </button>
                <button> Edit </button>
                <button> Delete </button>
            </p>
        </section>
    </div>
    )
};

export default  Project
