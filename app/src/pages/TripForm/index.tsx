import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
    Box,
    Container,
    Stepper,
    Step,
    StepLabel,
    Button,
    Stack,
    Paper,
    IconButton,
    styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyInput from "../../components/CurrencyInput";
import StandardInput from "../../components/StandardInput";
import DatePicker from "../../components/DatePicker";
import StandardPicklist from "../../components/StandardPicklist";

const StyledContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    padding: theme.spacing(4),
    background: `
        linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
        url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234A90E2' fill-opacity='0.1'%3E%3Cpath d='M10 20l20-10 10 10-10 20z'/%3E%3Cpath d='M80 20l-20-10-10 10 10 20z'/%3E%3Cpath d='M50 40l-10-20h20z'/%3E%3Cpath d='M30 60l20-10 10 10-10 20z'/%3E%3Cpath d='M70 60l-20-10-10 10 10 20z'/%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3Ccircle cx='80' cy='20' r='3'/%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3Cpath d='M20 20h60M50 20v30' stroke='%234A90E2' stroke-width='1' stroke-opacity='0.1' fill='none'/%3E%3C/g%3E%3C/svg%3E"),
        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 25l5-5 15 5-5 15z' fill='%234A90E2' fill-opacity='0.1'/%3E%3Cpath d='M30 10l15 5-5 15-15-5z' fill='%234A90E2' fill-opacity='0.1'/%3E%3C/svg%3E")
    `,
    backgroundSize: '100px 100px, 60px 60px',
    backgroundPosition: 'center center, center center',
    backgroundRepeat: 'repeat, repeat',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
            url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 2l3 6h-6z' fill='%234A90E2' fill-opacity='0.1'/%3E%3C/svg%3E")
        `,
        backgroundSize: '20px 20px',
        backgroundRepeat: 'repeat',
        opacity: 0.5,
        zIndex: -1,
    }
}));

const GlassPaper = styled(Paper)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.spacing(2),
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px 0 rgba(135, 81, 31, 0.15)',
}));

const DestinationBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(5px)',
    borderRadius: theme.spacing(1),
    border: '1px solid rgba(255, 255, 255, 0.5)',
    position: 'relative',
    marginBottom: theme.spacing(2),
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
}));

interface Destination {
    destination: string;
    startDate: string;
    endDate: string;
    duration: number;
}

interface TripFormData {
    destinations: Destination[];
    route: string;
    budget: string;
    travelStyle: string;
}

const steps = ["Budget", "Destinations", "Preferences"];

const travelStyles = [
    { value: "luxury", label: "Luxury" },
    { value: "budget", label: "Budget" },
    { value: "adventure", label: "Adventure" },
    { value: "cultural", label: "Cultural" },
];

const TripForm: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { control, handleSubmit, formState: { errors } } = useForm<TripFormData>({
        defaultValues: {
            destinations: [{
                destination: "",
                startDate: "",
                endDate: "",
                duration: 1
            }],
            route: "",
            budget: "",
            travelStyle: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "destinations"
    });

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const onSubmit = (data: TripFormData) => {
        console.log(data);
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <CurrencyInput
                        label="Total Trip Budget"
                        name="budget"
                        control={control}
                        error={errors.budget?.message}
                        rules={{ required: "Budget is required" }}
                    />
                );

            case 1:
                return (
                    <Stack spacing={3}>
                        {fields.map((field, index) => (
                            <React.Fragment key={field.id}>
                                <DestinationBox>
                                    <StandardInput
                                        label={`Destination ${index + 1}`}
                                        name={`destinations.${index}.destination`}
                                        control={control}
                                        error={errors.destinations?.[index]?.destination?.message}
                                        rules={{ required: "Destination is required" }}
                                    />
                                    {fields.length > 1 && (
                                        <IconButton
                                            size="small"
                                            sx={{
                                                position: "absolute",
                                                top: 8,
                                                right: 8,
                                                background: 'rgba(255,255,255,0.5)',
                                                '&:hover': {
                                                    background: 'rgba(255,255,255,0.8)',
                                                }
                                            }}
                                            onClick={() => remove(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                    <DatePicker
                                        label="Start Date"
                                        name={`destinations.${index}.startDate`}
                                        control={control}
                                        error={errors.destinations?.[index]?.startDate?.message}
                                        rules={{ required: "Start date is required" }}
                                    />
                                    <DatePicker
                                        label="End Date"
                                        name={`destinations.${index}.endDate`}
                                        control={control}
                                        error={errors.destinations?.[index]?.endDate?.message}
                                        rules={{ required: "End date is required" }}
                                    />
                                </DestinationBox>
                            </React.Fragment>
                        ))}
                        <Button
                            startIcon={<AddIcon />}
                            onClick={() => append({
                                destination: "",
                                startDate: "",
                                endDate: "",
                                duration: 1
                            })}
                            sx={{
                                background: 'rgba(255,255,255,0.7)',
                                '&:hover': {
                                    background: 'rgba(255,255,255,0.9)',
                                }
                            }}
                        >
                            Add Another Destination
                        </Button>
                    </Stack>
                );

            case 2:
                return (
                    <StandardPicklist
                        label="Travel Style"
                        name="travelStyle"
                        control={control}
                        error={errors.travelStyle?.message}
                        options={travelStyles}
                        rules={{ required: "Travel style is required" }}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <StyledContainer>
            <GlassPaper elevation={0} sx={{ p: 4 }}>
                <Box sx={{ width: "100%" }}>
                    <Stepper
                        activeStep={activeStep}
                        sx={{
                            mb: 4,
                            '& .MuiStepLabel-label': {
                                color: 'rgba(0,0,0,0.7)',
                            },
                            '& .MuiStepIcon-root': {
                                color: 'rgba(0,0,0,0.3)',
                                '&.Mui-active': {
                                    color: 'primary.main',
                                },
                                '&.Mui-completed': {
                                    color: 'success.light',
                                },
                            },
                        }}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ mt: 2, mb: 4 }}>
                            {renderStepContent(activeStep)}
                        </Box>

                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            {activeStep > 0 && (
                                <Button
                                    onClick={handleBack}
                                    sx={{
                                        background: 'rgba(255,255,255,0.7)',
                                        '&:hover': {
                                            background: 'rgba(255,255,255,0.9)',
                                        }
                                    }}
                                >
                                    Back
                                </Button>
                            )}
                            {activeStep < steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            )}
                        </Stack>
                    </form>
                </Box>
            </GlassPaper>
        </StyledContainer>
    );
};

export default TripForm;