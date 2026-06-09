import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { DevGroup } from "../../../model/DevGroup";
import type { Meet } from "../../../model/Meet";
import devGroupService from "../../../services/devGroup";
import meetService from "../../../services/meet";

function UpdateMeet() {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();
    
    const [devGroups, setDevGroups] = useState<DevGroup[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Meet>();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const groupsData = await devGroupService.getAllDevGroup();
                setDevGroups(groupsData);

                if (id) {
                    const currentMeet = await meetService.getMeetDetailsById(id); 
                    
                    if (currentMeet) {
                        currentMeet.startTime = new Date(currentMeet.startTime).toISOString().slice(0, 16) as unknown as Date;
                        currentMeet.finishTime = new Date(currentMeet.finishTime).toISOString().slice(0, 16) as  unknown as Date;
                        reset(currentMeet); 
                    }
                }
            } catch (e) {
                alert(e);
                navigate("/"); 
            } finally {
                setIsLoading(false);
            }
        })();
    }, [id, reset, navigate]);

    async function handleUpdateMeet(data: Meet) {
        try {
            if (id) {
                const cleanData = {
                    devGroupId: data.devGroupId,
                    startTime: data.startTime,
                    finishTime: data.finishTime,
                    description: data.description,
                    room: data.room
                };
                await meetService.updateMeet(id, cleanData as any);
                navigate("/"); 
            }
        } catch (e: any) {
            alert(e.response?.data?.message || e.message || "Error updating meeting");
        }
    }

    if (isLoading) return <div className="text-center my-5">Loading data...</div>;

    return (
        <div className="container p-4" style={{ maxWidth: "500px" }}>
            <h3 className="mb-4 text-center border-bottom pb-2">Update Meeting</h3>
            
            <form onSubmit={handleSubmit(handleUpdateMeet)} className="d-flex flex-column gap-3">
                
                <div>
                    <label className="form-label fw-bold">Development Group</label>
                    <select 
                        {...register('devGroupId', { required: "Development group is required" })} 
                        className={`form-select ${errors.devGroupId ? 'is-invalid' : ''}`}
                        defaultValue=""
                    >
                        <option value="" disabled>Select dev group...</option>
                        {devGroups.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                    {errors.devGroupId && <div className="invalid-feedback">{errors.devGroupId.message}</div>}
                </div>

                <div>
                    <label className="form-label fw-bold">Start Time</label>
                    <input 
                        type="datetime-local" 
                        className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
                        {...register('startTime', { required: "Start time is required" })} 
                    />
                    {errors.startTime && <div className="invalid-feedback">{errors.startTime.message}</div>}
                </div>

                <div>
                    <label className="form-label fw-bold">Finish Time</label>
                    <input 
                        type="datetime-local" 
                        className={`form-control ${errors.finishTime ? 'is-invalid' : ''}`}
                        {...register('finishTime', { 
                            required: "Finish time is required",
                            validate: (value, formValues) => {
                                if (!formValues.startTime) return true;
                                const start = new Date(formValues.startTime).getTime();
                                const finish = new Date(value).getTime();
                                return finish > start || "Finish time must be after start time";
                            }
                        })} 
                    />
                    {errors.finishTime && <div className="invalid-feedback">{errors.finishTime.message}</div>}
                </div>

                <div>
                    <label className="form-label fw-bold">Description</label>
                    <input 
                        type="text" 
                        placeholder="Meeting description..."
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        {...register('description', { required: "Description is required" })} 
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                </div>

                <div>
                    <label className="form-label fw-bold">Room</label>
                    <input 
                        type="text" 
                        placeholder="Room name/number..."
                        className={`form-control ${errors.room ? 'is-invalid' : ''}`}
                        {...register('room', { required: "Room is required" })} 
                    />
                    {errors.room && <div className="invalid-feedback">{errors.room.message}</div>}
                </div>

                <div className="d-flex gap-2 mt-3">
                    <button type="submit" className="btn btn-primary flex-grow-1">Update Meeting</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
                </div>

            </form>
        </div>
    );
}

export default UpdateMeet;
