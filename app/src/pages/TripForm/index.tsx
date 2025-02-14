import React, { useCallback, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel, Stack, IconButton, Grid, Checkbox, TextField, Grid2 } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { GoogleMap, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";
import CONFIG from "../../../config.json";

interface TripFormData {
    destinations: { destination: string; duration: number | "flexible" }[];
    route: string;
    startDate: string;
    endDate: string;
    budget: string;
    travelStyle: string;
}

const TripForm: React.FC = () => {
    const { control, handleSubmit, setValue } = useForm<TripFormData>({
        defaultValues: {
            destinations: [{ destination: "", duration: 1 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "destinations",
    });
    

    const onSubmit = (data: TripFormData) => {
        console.log("Form Data:", data);
        alert("Form submitted successfully!");
    };
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <Box sx={{ mt: 4, p: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom mb={2}>
                        Getting the plan started!
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={3}>
                            {fields.map((field, index) => (
                                <Box key={field.id} sx={{ border: "1px solid #ccc", p: 2, borderRadius: 1, mb: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Destination {index + 1}
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        label="Where are you going?"
                                        value={field.destination}
                                        onChange={(e) => setValue(`destinations.${index}.destination`, e.target.value)}
                                        sx={{ mb: 2 }}
                                    />

                                    <Box display="flex" alignItems="center" gap={2}>
                                        <TextField
                                            fullWidth
                                            label="Duration (in days)"
                                            type="number"
                                            value={field.duration === "flexible" ? "" : field.duration}
                                            onChange={(e) => setValue(`destinations.${index}.duration`, Number(e.target.value))}
                                            disabled={field.duration === "flexible"}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={field.duration === "flexible"}
                                                    onChange={(e) =>
                                                        setValue(
                                                            `destinations.${index}.duration`,
                                                            e.target.checked ? "flexible" : 1
                                                        )
                                                    }
                                                />
                                            }
                                            label="Flexible"
                                        />
                                    </Box>

                                    {index > 0 && (
                                        <IconButton onClick={() => remove(index)} color="error" sx={{ mt: 2 }}>
                                            <Remove />
                                        </IconButton>
                                    )}
                                </Box>
                            ))}

                            <Button
                                type="button"
                                variant="outlined"
                                startIcon={<Add />}
                                onClick={() => append({ destination: "", duration: 1 })}
                            >
                                Add Destination
                            </Button>

                            <Button type="submit" variant="contained" size="large" fullWidth>
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Box sx={{ mt: 4, p: 3, height: "100vh", position: "sticky", top: 0 }}>
                    <Typography variant="h6" gutterBottom>
                        Pick a Location
                    </Typography>
                    {isLoaded ? (
                        <>
                            <Autocomplete
                                onLoad={(autocomplete) => {
                                    autocomplete.setFields(["name", "geometry"]);
                                }}
                                onPlaceChanged={() => {
                                    const place = (
                                        document.getElementById("autocomplete") as HTMLInputElement
                                    ).value;
                                    if (place) {
                                        const service = new google.maps.places.PlacesService(
                                            document.createElement("div")
                                        );
                                        service.textSearch({ query: place }, (results, status) => {
                                            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                                                handlePlaceSelect(results[0]);
                                            }
                                        });
                                    }
                                }}
                            >
                                <TextField
                                    id="autocomplete"
                                    fullWidth
                                    label="Search for a place"
                                    sx={{ mb: 2 }}
                                />
                            </Autocomplete>

                            <GoogleMap
                                mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "8px" }}
                                zoom={10}
                                center={mapCenter}
                            >
                                {selectedPlace && (
                                    <Marker
                                        position={{
                                            lat: selectedPlace.geometry?.location?.lat() || mapCenter.lat,
                                            lng: selectedPlace.geometry?.location?.lng() || mapCenter.lng,
                                        }}
                                    />
                                )}
                            </GoogleMap>
                        </>
                    ) : (
                        <Typography>Loading map...</Typography>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};
export default TripForm;