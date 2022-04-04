import {ROLE} from "../../helper/define";

export default function Management() {
    return <></>;
}

export async function getServerSideProps({ req, res }) {
    return {
        redirect: {
            destination: '/management/vaccine',
        },
    }
}