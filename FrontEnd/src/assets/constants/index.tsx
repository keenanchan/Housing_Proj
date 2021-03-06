export * from './messages';

export enum Interval { // TODO start using enums like this whenever possible instead of consts
  Anytime = 'Anytime',
  Early = 'Early(1-10)',
  Mid = 'Mid(11-20)',
  Late = 'Late(21-31)',
}
const intervalOptions = ['Anytime', 'Early(1-10)', 'Mid(11-20)', 'Late(21-31)'];

const yearMonths = [
  'Anytime',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Months in the year
 */
// TODO make everything PascalCase
enum Month {
  Anytime = 'Anytime',
  January = 'January',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
  June = 'June',
  July = 'July',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December',
}

/**
 * Months in the year, abbreviated
 */
enum MonthAbrv {
  Anytime = 'Anytime',
  January = 'Jan',
  February = 'Feb',
  March = 'Mar',
  April = 'Apr',
  May = 'May',
  June = 'Jun',
  July = 'Jul',
  August = 'Aug',
  September = 'Sep',
  October = 'Oct',
  November = 'Nov',
  December = 'Dec',
}

/**
 * object of month (unabbreviated) to month (abbreviated)
 */
const monthsUnabrvToAbrv = {
  [Month.Anytime]: MonthAbrv.Anytime,
  [Month.January]: MonthAbrv.January,
  [Month.February]: MonthAbrv.February,
  [Month.March]: MonthAbrv.March,
  [Month.April]: MonthAbrv.April,
  [Month.May]: MonthAbrv.May,
  [Month.June]: MonthAbrv.June,
  [Month.July]: MonthAbrv.July,
  [Month.August]: MonthAbrv.August,
  [Month.September]: MonthAbrv.September,
  [Month.October]: MonthAbrv.October,
  [Month.November]: MonthAbrv.November,
  [Month.December]: MonthAbrv.December,
};
// #TODO ADD all the files in a central place
const BackendMapping = {
  schoolYear: 'school_year',
  RoomType: 'room_type',
  stayPeriod: 'stay_period',
  token: 'token',
  description: 'description',
  major: 'major',
  phone: 'phone',
  name: 'name',
  email: 'email',
  profilePhoto: 'profile_photo',
};

enum SchoolYear {
  First = 'First',
  Second = 'Second',
  Third = 'Third',
  Fourth = 'Fourth',
  Fifth = 'Fifth',
  Grad = 'Grad',
}

enum RoomType {
  Single = 'Single',
  Double = 'Double',
  Triple = 'Triple',
  Studio = 'Studio',
  Suite = 'Suite',
  LivingRoom = 'Living room',
}

/**
 * list of majors offered in UCSD/ need to extract from API endpoints in the future for other schools
 */
const majors = [
  'Anthropological (Archaeology) BA',
  'Anthropology (Biological Anthropology) BA',
  'Anthropology (Climate Change and Human Solutions) BA',
  'Anthropology (Sociocultural Anthropology) BA',
  'Biological Anthropology BS',
  'Bioengineering BS',
  'Bioengineering: Biotechnology BS',
  'Bioengineering: Bioinformatics BS',
  'Bioengineering: BioSystems BS',
  'General Biology BS',
  'Biology with a Specialization in Bioinformatics BS',
  'Ecology, Behavior, and Evolution BS',
  'Human Biology BS',
  'Microbiology BS',
  'Molecular and Cell Biology BS',
  'Neurobiology BS',
  'Chemistry BS',
  'Chemistry with Specialization in Earth Sciences BS',
  'Biochemistry/Chemistry BS',
  'Environmental Chemistry BS',
  'Molecular Synthesis BS',
  'Pharmacological Chemistry BS',
  'Bioinformatics BS',
  'Cognitive Science BA/BS',
  'Cognitive Science with Specialization in Clinical Aspects of Cognition BS',
  'Cognitive Science with Specialization in Design and Interaction BS',
  'Cognitive Science with Specialization in Machine Learning and Neural Computation BS',
  'Cognitive Science with Specialization in Neuroscience BS',
  'Cognitive Science with Specialization in Language and Culture BS',
  'Cognitive and Behavioral Neuroscience BS',
  'Communication BA',
  'Computer Science BA/BS',
  'Computer Engineering BS',
  'Computer Science with Specialization in Bioinformatics BS',
  'Economics BA',
  'Economics–Public Policy BA/MPP only',
  'Management Science BS',
  'Joint Economics-Mathematics BS',
  'Education Sciences BS',
  'Electrical Engineering BS',
  'Electrical Engineering and Society BA',
  'Engineering Physics BS',
  'Ethnic Studies BA',
  'Public Health BS',
  'Data Science BS',
  'History BA',
  'Linguistics (Cognition and Language) BA',
  'Linguistics (Language and Society) BA',
  'Linguistics (Speech and Language Sciences) BA',
  'Language Studies BA',
  'Linguistics BA',
  'Literatures in English BA',
  'Literatures in Spanish BA',
  'Literature/Writing BA',
  'World Literature and Culture BA',
  'Mathematics BS',
  'Mathematics (Applied) BS',
  'Mathematics—Computer Science BS',
  'Mathematics—Applied Science BS',
  'Joint Mathematics-Economics BS',
  'Mathematics—Scientific Computation BS',
  'Mathematics—Secondary Education BA',
  'Probability and Statistics BS',
  'Aerospace Engineering BS',
  'Environmental Engineering BS',
  'Mechanical Engineering BS',
  'Mechanical Engineering with a Specialization in Controls and Robotics BS',
  'Mechanical Engineering with a Specialization in Fluid Mechanics and Thermal Systems BS',
  'Mechanical Engineering with a Specialization in Materials Science and Engineering BS',
  'Mechanical Engineering with a Specialization in Mechanics of Materials BS',
  'Mechanical Engineering with a Specialization in Renewable Energy and Environmental Flows BS',
  'Music BA',
  'Music/Humanities BA',
  'Chemical Engineering BS',
  'Nanoengineering BS',
  'Philosophy BA',
  'General Physics BA',
  'General Physics/Secondary Education BA',
  'Physics BS',
  'Physics/Biophysics BS',
  'Physics with Specialization in Computational Physics BS',
  'Physics with Specialization in Earth Sciences BS',
  'Physics with Specialization in Materials Physics BS',
  'Physics with Specialization in Astrophysics BS',
  'Political Science BA',
  'Political Science (American Politics) BA',
  'Political Science (Comparative Politics) BA',
  'Political Science (International Relations) BA',
  'Political Science (International Affairs) BA/MIA only',
  'Political Science (Political Theory) BA',
  'Political Science (Public Law) BA',
  'Political Science (Public Policy) BA',
  'Business Psychology BS',
  'Cognitive and Behavioral Neuroscience Bachelor of Science BS',
  'Psychology BA',
  'Psychology BS',
  'Psychology Bachelor of Science with a Specialization in Clinical Psychology BS',
  'Psychology Bachelor of Science with a Specialization in Cognitive Psychology BS',
  'Psychology Bachelor of Science with a Specialization in Developmental Psychology BS',
  'Psychology Bachelor of Science with a Specialization in Human Health BS',
  'Psychology Bachelor of Science with a Specialization in Sensation and Perception BS',
  'Psychology Bachelor of Science with a Specialization in Social Psychology BS',
  'Earth Sciences BS',
  'Marine Biology BS',
  'Oceanic and Atmospheric Sciences BS',
  'Sociology BA',
  'Sociology—International Studies BA',
  'Sociology—American Studies BA',
  'Sociology—Science and Medicine BA',
  'Sociology—Economy and Society BA',
  'Sociology—Culture and Communication BA',
  'Sociology—Social Inequity BA',
  'Sociology—Law and Society BA',
  'Structural Engineering BS',
  'Dance BA',
  'Theatre BA',
  'Urban Studies and Planning BA',
  'Visual Arts (Art History/Criticism) BA',
  'Visual Arts (Media) BA',
  'Visual Arts (Studio) BA',
  'Interdisciplinary Computing and the Arts BA',
  'Speculative Design BA',
  'Chinese Studies BA',
  'Classical Studies BA',
  'College Special Individual Majors BA',
  'Critical Gender Studies BA',
  'Environmental Systems—Earth Sciences BS',
  'Environmental Systems—Ecology, Behavior and Evolution BS',
  'Environmental Systems—Environmental Chemistry BS',
  'Environmental Systems—Environmental Policy BA',
  'German Studies BA',
  'Global Health BA',
  'Global Health BS',
  'Global South Studies BA',
  'Human Developmental Sciences BA',
  'Human Developmental Sciences BS',
  'Human Developmental Sciences with a Specialization in Equity and Diversity BS',
  'Human Developmental Sciences with a Specialization in Healthy Aging BS',
  'International Studies—Anthropology BA',
  'International Studies—Economics BA',
  'International Studies—History BA',
  'International Studies—International Business BA',
  'International Studies—Linguistics BA',
  'International Studies—Literature BA',
  'International Studies—Philosophy BA',
  'International Studies—Political Science BA',
  'International Studies—Sociology BA',
  '5-year International Studies—Economics BA/MIA',
  '5-year International Studies—International Business BA/MIA',
  '5-year International Studies—Political Science BA/MIA',
  'Italian Studies BA',
  'Japanese Studies BA',
  'Jewish Studies BA',
  'Latin American Studies BA',
  'Latin American Studies with a Concentration in Mexico BA',
  'Latin American Studies with a Concentration in Migration and Border Studies BA',
  'Real Estate and Development BS',
  'Russian, East European, and Eurasian Studies BA',
  'Study of Religion BA',
];

const schoolYears = ['First', 'Sophomore', 'Junior', 'Senior', 'Fifth', 'Grad'];

export {
  intervalOptions,
  yearMonths,
  Month,
  MonthAbrv,
  monthsUnabrvToAbrv,
  SchoolYear,
  RoomType,
  majors,
  schoolYears,
  BackendMapping,
};
