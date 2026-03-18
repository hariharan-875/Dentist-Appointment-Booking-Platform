require('dotenv').config()

const { all, run } = require('./index')
const { initDb } = require('./init')

async function seedDentists() {
  await initDb()

  const existing = await all('SELECT id FROM dentists LIMIT 1')
  if (existing.length > 0) {
    // eslint-disable-next-line no-console
    console.log('Dentists already exist. Skipping seed.')
    return
  }

  const dentists = [
    {
      name: 'Dr. Aisha Khan',
      photoUrl: 'https://i.pravatar.cc/200?img=47',
      qualification: 'BDS, MDS (Orthodontics)',
      experienceYears: 9,
      clinicName: 'Pearl Smile Clinic',
      address: '12 Lakeview Road',
      location: 'Bengaluru',
    },
    {
      name: 'Dr. Arjun Mehta',
      photoUrl: 'https://i.pravatar.cc/200?img=12',
      qualification: 'BDS, MDS (Endodontics)',
      experienceYears: 11,
      clinicName: 'RootCare Dental',
      address: '88 MG Street',
      location: 'Hyderabad',
    },
    {
      name: 'Dr. Neha Sharma',
      photoUrl: 'https://i.pravatar.cc/200?img=32',
      qualification: 'BDS',
      experienceYears: 6,
      clinicName: 'BrightCare Dentistry',
      address: '5 Green Park Avenue',
      location: 'Chennai',
    },
    {
      name: 'Dr. Rohan Iyer',
      photoUrl: 'https://i.pravatar.cc/200?img=8',
      qualification: 'BDS, MDS (Prosthodontics)',
      experienceYears: 14,
      clinicName: 'Crown & Bridge Studio',
      address: '21 High Street',
      location: 'Pune',
    },
    {
      name: 'Dr. Priya Nair',
      photoUrl: 'https://i.pravatar.cc/200?img=24',
      qualification: 'BDS, MDS (Periodontics)',
      experienceYears: 10,
      clinicName: 'GumCare Dental Center',
      address: '3 Sunrise Plaza',
      location: 'Kochi',
    },
    {
      name: 'Dr. Sameer Ali',
      photoUrl: 'https://i.pravatar.cc/200?img=14',
      qualification: 'BDS (Implantology)',
      experienceYears: 8,
      clinicName: 'Implant Plus',
      address: '44 Riverfront Lane',
      location: 'Mumbai',
    },
  ]

  for (const d of dentists) {
    await run(
      `INSERT INTO dentists (name, photoUrl, qualification, experienceYears, clinicName, address, location)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        d.name,
        d.photoUrl,
        d.qualification,
        d.experienceYears,
        d.clinicName,
        d.address,
        d.location,
      ]
    )
  }

  // eslint-disable-next-line no-console
  console.log(`Seeded ${dentists.length} dentists.`)
}

seedDentists().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})

