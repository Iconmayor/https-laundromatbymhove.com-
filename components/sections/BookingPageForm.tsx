'use client';

import {BookingForm} from './BookingForm';

export default function BookingPageForm({saveEnabled}:{saveEnabled:boolean}){
 return <BookingForm readService saveEnabled={saveEnabled}/>;
}
