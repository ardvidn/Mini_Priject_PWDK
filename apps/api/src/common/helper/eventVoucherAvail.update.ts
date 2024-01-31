import prisma from "@/prisma"

const eventVoucehrAvailUpdate = async (eventId:number) => {
    const getEvent = await prisma.event.update({
        where: {
            id: eventId
        },
        data: {
            eventVoucherAvail: {
                decrement: 1
            }
        }
    })
}

export default eventVoucehrAvailUpdate;