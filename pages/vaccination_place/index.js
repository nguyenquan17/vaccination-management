import {ROLE} from "../../helper/define";

export default function VaccinationPlace() {
    return <></>;
}

export async function getServerSideProps({ req, res }) {
    return {
        redirect: {
            destination: '/vaccination_place/schedule_injections',
        },
    }
}