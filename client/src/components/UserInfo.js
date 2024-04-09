import React from "react";
import {
	Typography,
} from "@mui/material";
import { positions } from "../permissions/PermissionsUtils";
import { CommitteeList } from "../components/OfficerCommitteeHelpers";


function UserInfo({ selectedUser }) {
        return (
            <>
                <Typography
                    variant="p"
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                        fontSize: "1rem",
                    }}
                >
                    Name
                </Typography>
                <Typography
                    variant="p"
                    mb={1}
                    sx={{
                        fontSize: "1rem",
                    }}
                >
                    {selectedUser.name?.first} {selectedUser.name?.last}
                </Typography>
                <Typography
                    variant="p"
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                        fontSize: "1rem",
                    }}
                >
                    Email
                </Typography>
                <Typography
                    variant="p"
                    mb={1}
                    sx={{
                        fontSize: "1rem",
                    }}
                >
                    {selectedUser.email}
                </Typography>
                <Typography
                    variant="p"
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                        fontSize: "1rem",
                    }}
                >
                    Major
                </Typography>
                <Typography
                    variant="p"
                    mb={1}
                    sx={{
                        fontSize: "1rem",
                    }}
                >
                    {selectedUser.major}
                </Typography>
                <Typography
                    variant="p"
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                        fontSize: "1rem",
                    }}
                >
                    Graduation Year
                </Typography>
                <Typography
                    variant="p"
                    mb={1}
                    sx={{
                        fontSize: "1rem",
                    }}
                >
                    {selectedUser.graduationYear}
                </Typography>
                <Typography
                    variant="p"
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                        fontSize: "1rem",
                    }}
                >
                    Initiation Quarter
                </Typography>
                <Typography
                    variant="p"
                    mb={1}
                    sx={{
                        fontSize: "1rem",
                    }}
                >
                    {selectedUser.initiationQuarter?.year}{" "}
                    {selectedUser.initiationQuarter?.quarter}
                </Typography>
                {selectedUser.position === positions.officer ? (
                    <div>
                        <Typography
                            variant="p"
                            sx={{
                                color: (theme) => theme.palette.primary.main,
                                fontSize: "1rem",
                            }}
                        >
                            Committees
                        </Typography>
                        <CommitteeList committees={selectedUser.committees} />
                    </div>
                ) : null}
            </>
    );
};

export default UserInfo;