-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "hotel_id" INTEGER NOT NULL,
    "adult" INTEGER NOT NULL,
    "children" INTEGER NOT NULL DEFAULT 0,
    "checkin_time" TIMESTAMP(3) NOT NULL,
    "checkout_time" TIMESTAMP(3) NOT NULL,
    "checked_in" BOOLEAN NOT NULL DEFAULT false,
    "documents" TEXT[],

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
