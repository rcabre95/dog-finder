import axios from 'axios';

export async function sendEmail(name: string, email: string, dogName: string, zip: string) {
    return await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_HOME_URL}/api/send-mail`,
        data: {
            name: name,
            email: email,
            dogName: dogName,
            location: `123 N Fake St - FakeTown, FS ${zip}`,
            phone: "(555) 555-5555",
            dogEmail: "fake@email.com"
        },
    });
};