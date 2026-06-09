import { useEffect, useState, type ChangeEvent } from "react";
import type { DevGroup } from "../../../model/DevGroup";
import devGroupService from "../../../services/devGroup";
import meetService from "../../../services/meet";
import type { Meet } from "../../../model/Meet";
import CardMeet from "../cardMeet/CardMeet";
import { Link } from "react-router-dom";

function MeetList() {
    const [devGroups, setDevGroups] = useState<DevGroup[]>([]);
    const [meets, setMeets] = useState<Meet[]>([]);
    const [idloading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const data = await devGroupService.getAllDevGroup();
                setDevGroups(data);
            } catch (e) {
                alert(e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    async function selectMeetByDevGroup(e: ChangeEvent<HTMLSelectElement>) {
        const devGroupId = e.target.value;
        try {
            const data = await meetService.getMeetByDevGroup(devGroupId) as unknown as Meet[];
            setMeets(data);
        } catch (e) {
            alert(e);
            throw e;
        }
    }

    function deleteMeet(id: string) {
        setMeets(meets.filter(m => m.id !== id));
    }

    return (
        <div className="container py-5" style={{ maxWidth: "1100px" }}>
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-5">
                <h1 className="fw-bold text-dark m-0" style={{ fontSize: "1.75rem", letterSpacing: "-0.5px" }}>
                    MeetFlow
                </h1>
                <Link to={'/new'} className="btn btn-dark px-4 py-2 rounded-3 fw-medium shadow-sm" style={{ fontSize: "0.9rem" }}>
                    + New Meeting
                </Link>
            </div>

            <div className="row justify-content-center mb-5">
                <div className="col-md-6 col-12">
                    <label className="form-label text-muted small fw-bold text-uppercase tracking-wider mb-2">
                        Filter by Team
                    </label>
                    {idloading ? (
                        <div className="form-control bg-light text-center border-0 py-2 text-muted small">Loading groups...</div>
                    ) : (
                        <select 
                            onChange={selectMeetByDevGroup} 
                            defaultValue="" 
                            className="form-select border-0 px-3 py-2.5 rounded-3 bg-white shadow-sm"
                            style={{ fontSize: "0.95rem", color: "#495057", minHeight: "45px" }}
                        >
                            <option value="" disabled>Select development group...</option>
                            {devGroups.map(e => (
                                <option key={e.id} value={e.id}>{e.name}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            <div className="row g-4 justify-content-center">
                {meets.length === 0 ? (
                    <div className="col-12 text-center py-5">
                        <p className="text-muted m-0" style={{ fontSize: "0.95rem" }}>
                            No meetings scheduled for this group.
                        </p>
                    </div>
                ) : (
                    meets.map(m => (
                        <div key={m.id} className="col-lg-6 col-md-6 col-12">
                            <CardMeet delteFunc={() => deleteMeet(m.id)} meet={m} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MeetList;
