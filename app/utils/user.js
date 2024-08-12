'use server'
export async function createUser(member) {
    "use server";
    const user = await clerkClient.users.create({
      emailAddresses: [{ email: member.email }],
      password: member.password,
      firstName: member.firstName,
      lastName: member.lastName,
    });
    return user;
  }