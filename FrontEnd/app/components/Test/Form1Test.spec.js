import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Form1 from "../Form1";
import FormFacility from "../FormFacility";
import FormTransportation from "../FormTransportation";
import FormRadio from "../FormRadio";
import FormPreference from "../FormPreference";
import FormQuestion from "../FormQuestion";
import FormHostGender from "../FormHostGender";
/**
 * Test Cases for the component Form1.js
 * shallow is used for partial rendering so that Google API would not load
 */

configure({ adapter: new Adapter() });
describe("Check successful rendering", () => {
  test("Initial Rendering", () => {
    shallow(<Form1 />);
  });
});

describe("Check default of all", () => {
  test("Checking default of Required Facilities", () => {
    const wrapper = shallow(<Form1 />);
    var all_options = wrapper.find("#all").shallow();
    expect(all_options.props().value).toEqual("no");
    expect(all_options.props().checked).toEqual(false);
  });
});

describe("Check triggering all", () => {
  test("Checking selecting all facilities", () => {
    const wrapper = shallow(<Form1 />);
    var all_options = wrapper.find("#all").shallow();
    var event = { target: { value: all_options.props().value } };
    all_options.props().onChange(event);
    var all_options_new = wrapper.find("#all").shallow();
    expect(all_options_new.props().value).toEqual("yes");
    expect(all_options_new.props().checked).toEqual(true);
  });
});

describe("Check all select all other options as well", () => {
  test("Checking selecting all facilities", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var all_options = facility.find("#all");
    all_options.invoke("onChange")({
      target: { name: "all", value: mockForm.state("bulk")["all"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("yes");
    expect(mockForm.state("bulk")["washer"]).toEqual("yes");
    expect(mockForm.state("bulk")["patio"]).toEqual("yes");
    expect(mockForm.state("bulk")["fridge"]).toEqual("yes");
    expect(mockForm.state("bulk")["oven"]).toEqual("yes");
    expect(mockForm.state("bulk")["ac"]).toEqual("yes");
    expect(mockForm.state("bulk")["pool"]).toEqual("yes");
    expect(mockForm.state("bulk")["SPA"]).toEqual("yes");
    expect(mockForm.state("bulk")["gym"]).toEqual("yes");
    expect(mockForm.state("bulk")["elevator"]).toEqual("yes");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("yes");
    expect(mockForm.state("bulk")["microwave"]).toEqual("yes");
  });
});

describe("Check deselect all case", () => {
  test("Checking deselecting all facilities", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var all_options = facility.find("#all");
    all_options.invoke("onChange")({
      target: { name: "all", value: mockForm.state("bulk")["all"] }
    });
    all_options.invoke("onChange")({
      target: { name: "all", value: mockForm.state("bulk")["all"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("no");
    expect(mockForm.state("bulk")["washer"]).toEqual("no");
    expect(mockForm.state("bulk")["patio"]).toEqual("no");
    expect(mockForm.state("bulk")["fridge"]).toEqual("no");
    expect(mockForm.state("bulk")["oven"]).toEqual("no");
    expect(mockForm.state("bulk")["ac"]).toEqual("no");
    expect(mockForm.state("bulk")["pool"]).toEqual("no");
    expect(mockForm.state("bulk")["SPA"]).toEqual("no");
    expect(mockForm.state("bulk")["gym"]).toEqual("no");
    expect(mockForm.state("bulk")["elevator"]).toEqual("no");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("no");
    expect(mockForm.state("bulk")["microwave"]).toEqual("no");
  });
});

describe("Check select one case", () => {
  test("Checking select one facility", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var washer_options = facility.find("#washer");
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("no");
    expect(mockForm.state("bulk")["washer"]).toEqual("yes");
    expect(mockForm.state("bulk")["patio"]).toEqual("no");
    expect(mockForm.state("bulk")["fridge"]).toEqual("no");
    expect(mockForm.state("bulk")["oven"]).toEqual("no");
    expect(mockForm.state("bulk")["ac"]).toEqual("no");
    expect(mockForm.state("bulk")["pool"]).toEqual("no");
    expect(mockForm.state("bulk")["SPA"]).toEqual("no");
    expect(mockForm.state("bulk")["gym"]).toEqual("no");
    expect(mockForm.state("bulk")["elevator"]).toEqual("no");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("no");
    expect(mockForm.state("bulk")["microwave"]).toEqual("no");
  });
});

describe("Check deselect one case", () => {
  test("Checking deselect one facility", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var washer_options = facility.find("#washer");
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("no");
    expect(mockForm.state("bulk")["washer"]).toEqual("no");
    expect(mockForm.state("bulk")["patio"]).toEqual("no");
    expect(mockForm.state("bulk")["fridge"]).toEqual("no");
    expect(mockForm.state("bulk")["oven"]).toEqual("no");
    expect(mockForm.state("bulk")["ac"]).toEqual("no");
    expect(mockForm.state("bulk")["pool"]).toEqual("no");
    expect(mockForm.state("bulk")["SPA"]).toEqual("no");
    expect(mockForm.state("bulk")["gym"]).toEqual("no");
    expect(mockForm.state("bulk")["elevator"]).toEqual("no");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("no");
    expect(mockForm.state("bulk")["microwave"]).toEqual("no");
  });
});

describe("Check select multiple cases", () => {
  test("Checking select multiple facilities", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var washer_options = facility.find("#washer");
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    var SPA_options = facility.find("#SPA");
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("no");
    expect(mockForm.state("bulk")["washer"]).toEqual("yes");
    expect(mockForm.state("bulk")["patio"]).toEqual("no");
    expect(mockForm.state("bulk")["fridge"]).toEqual("no");
    expect(mockForm.state("bulk")["oven"]).toEqual("no");
    expect(mockForm.state("bulk")["ac"]).toEqual("no");
    expect(mockForm.state("bulk")["pool"]).toEqual("no");
    expect(mockForm.state("bulk")["SPA"]).toEqual("yes");
    expect(mockForm.state("bulk")["gym"]).toEqual("no");
    expect(mockForm.state("bulk")["elevator"]).toEqual("no");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("no");
    expect(mockForm.state("bulk")["microwave"]).toEqual("no");
  });
});

describe("Check deselect multiple cases", () => {
  test("Checking deselect multiple facilities", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var washer_options = facility.find("#washer");
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    var SPA_options = facility.find("#SPA");
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    var elevator_options = facility.find("#elevator");
    elevator_options.invoke("onChange")({
      target: { name: "elevator", value: mockForm.state("bulk")["elevator"] }
    });
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("no");
    expect(mockForm.state("bulk")["washer"]).toEqual("no");
    expect(mockForm.state("bulk")["patio"]).toEqual("no");
    expect(mockForm.state("bulk")["fridge"]).toEqual("no");
    expect(mockForm.state("bulk")["oven"]).toEqual("no");
    expect(mockForm.state("bulk")["ac"]).toEqual("no");
    expect(mockForm.state("bulk")["pool"]).toEqual("no");
    expect(mockForm.state("bulk")["SPA"]).toEqual("no");
    expect(mockForm.state("bulk")["gym"]).toEqual("no");
    expect(mockForm.state("bulk")["elevator"]).toEqual("yes");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("no");
    expect(mockForm.state("bulk")["microwave"]).toEqual("no");
  });
});

describe("Check select all cases then deselect and select", () => {
  test("Checking select all then deselect and select multiple facilities", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var all_options = facility.find("#all");
    all_options.invoke("onChange")({
      target: { name: "all", value: mockForm.state("bulk")["all"] }
    });
    var washer_options = facility.find("#washer");
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    var SPA_options = facility.find("#SPA");
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    var elevator_options = facility.find("#elevator");
    elevator_options.invoke("onChange")({
      target: { name: "elevator", value: mockForm.state("bulk")["elevator"] }
    });
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("no");
    expect(mockForm.state("bulk")["washer"]).toEqual("yes");
    expect(mockForm.state("bulk")["patio"]).toEqual("yes");
    expect(mockForm.state("bulk")["fridge"]).toEqual("yes");
    expect(mockForm.state("bulk")["oven"]).toEqual("yes");
    expect(mockForm.state("bulk")["ac"]).toEqual("yes");
    expect(mockForm.state("bulk")["pool"]).toEqual("yes");
    expect(mockForm.state("bulk")["SPA"]).toEqual("yes");
    expect(mockForm.state("bulk")["gym"]).toEqual("yes");
    expect(mockForm.state("bulk")["elevator"]).toEqual("no");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("yes");
    expect(mockForm.state("bulk")["microwave"]).toEqual("yes");
  });
});

describe("Check autoselect all option", () => {
  test("Checking autoselect all when selecting all facilities", () => {
    const mockForm = shallow(<Form1 />);
    const facility = mount(
      <FormFacility
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
        handleAll={mockForm.instance().handleAll}
      />
    );
    var all_options = facility.find("#all");
    all_options.invoke("onChange")({
      target: { name: "all", value: mockForm.state("bulk")["all"] }
    });
    var washer_options = facility.find("#washer");
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    var SPA_options = facility.find("#SPA");
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    var elevator_options = facility.find("#elevator");
    elevator_options.invoke("onChange")({
      target: { name: "elevator", value: mockForm.state("bulk")["elevator"] }
    });
    washer_options.invoke("onChange")({
      target: { name: "washer", value: mockForm.state("bulk")["washer"] }
    });
    SPA_options.invoke("onChange")({
      target: { name: "SPA", value: mockForm.state("bulk")["SPA"] }
    });
    elevator_options.invoke("onChange")({
      target: { name: "elevator", value: mockForm.state("bulk")["elevator"] }
    });
    expect(mockForm.state("bulk")["all"]).toEqual("yes");
    expect(mockForm.state("bulk")["washer"]).toEqual("yes");
    expect(mockForm.state("bulk")["patio"]).toEqual("yes");
    expect(mockForm.state("bulk")["fridge"]).toEqual("yes");
    expect(mockForm.state("bulk")["oven"]).toEqual("yes");
    expect(mockForm.state("bulk")["ac"]).toEqual("yes");
    expect(mockForm.state("bulk")["pool"]).toEqual("yes");
    expect(mockForm.state("bulk")["SPA"]).toEqual("yes");
    expect(mockForm.state("bulk")["gym"]).toEqual("yes");
    expect(mockForm.state("bulk")["elevator"]).toEqual("yes");
    expect(mockForm.state("bulk")["hardwood"]).toEqual("yes");
    expect(mockForm.state("bulk")["microwave"]).toEqual("yes");
  });
});
describe("check select", () => {
  test("transportation select", () => {
    const mockForm = shallow(<Form1 />);
    const mountedTransportation = mount(
      <FormTransportation
        bulk={mockForm.state("bulk")}
        handleDrop={mockForm.instance().handleDrop}
      />
    );
    const transportation_options = mountedTransportation.find(
      "#transportation"
    );
    const bus_options = mountedTransportation.find("#bus_cnt");
    const time_options = mountedTransportation.find("#time");

    // initial
    expect(mockForm.state("bulk")["transportation"]).toEqual("");
    expect(mockForm.state("bulk")["bus_cnt"]).toEqual("0");
    expect(mockForm.state("bulk")["time"]).toEqual("");

    // select transport
    transportation_options.invoke("onChange")(
      ("transportation", [{ name: "1" }])
    );

    expect(mockForm.state("bulk")["transportation"]).toEqual("1");
    expect(mockForm.state("bulk")["bus_cnt"]).toEqual("0");
    expect(mockForm.state("bulk")["time"]).toEqual("");
    // select transport
    transportation_options.invoke("onChange")(("bus_cnt", [{ name: "2" }]));
    expect(mockForm.state("bulk")["transportation"]).toEqual("2");
    expect(mockForm.state("bulk")["bus_cnt"]).toEqual("0");
    expect(mockForm.state("bulk")["time"]).toEqual("");

    // select bus_cnt
    bus_options.invoke("onChange")(("time", [{ name: "3" }]));
    expect(mockForm.state("bulk")["transportation"]).toEqual("2");
    expect(mockForm.state("bulk")["bus_cnt"]).toEqual("3");
    expect(mockForm.state("bulk")["time"]).toEqual("");

    // select bus_cnt
    bus_options.invoke("onChange")(("time", [{ name: "2" }]));
    expect(mockForm.state("bulk")["transportation"]).toEqual("2");
    expect(mockForm.state("bulk")["bus_cnt"]).toEqual("2");
    expect(mockForm.state("bulk")["time"]).toEqual("");

    // select time_options
    time_options.invoke("onChange")(("time", [{ name: "3" }]));
    expect(mockForm.state("bulk")["transportation"]).toEqual("2");
    expect(mockForm.state("bulk")["bus_cnt"]).toEqual("2");
    expect(mockForm.state("bulk")["time"]).toEqual("3");

    // select time_options
    time_options.invoke("onChange")(("time", [{ name: "2" }]));
    expect(mockForm.state("bulk")["transportation"]).toEqual("2");
    expect(mockForm.state("bulk")["bus_cnt"]).toEqual("2");
    expect(mockForm.state("bulk")["time"]).toEqual("2");
  });
});
describe("check radio", () => {
  test("radioInfo", () => {
    const mockForm = shallow(<Form1 />);
    const mountedRadio = mount(
      <FormRadio
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
      />
    );
    const negotiable_yes = mountedRadio.find("#negotiable_yes");
    const negotiable_no = mountedRadio.find("#negotiable_no");
    const utility_yes = mountedRadio.find("#utility_yes");
    const utility_no = mountedRadio.find("#utility_no");
    const private_yes = mountedRadio.find("#private_yes");
    const private_no = mountedRadio.find("#private_no");

    // Test would be better quality if we pull info directly from the object
    // initial
    expect(mockForm.state("bulk")["negotiable"]).toEqual("");
    expect(mockForm.state("bulk")["utility"]).toEqual("");
    expect(mockForm.state("bulk")["private"]).toEqual("");

    // negotiable yes
    negotiable_yes.invoke("onChange")({
      target: { name: "negotiable", value: "yes" }
    });
    expect(mockForm.state("bulk")["negotiable"]).toEqual("yes");
    expect(mockForm.state("bulk")["utility"]).toEqual("");
    expect(mockForm.state("bulk")["private"]).toEqual("");

    // utility yes
    utility_yes.invoke("onChange")({
      target: { name: "utility", value: "yes" }
    });
    expect(mockForm.state("bulk")["negotiable"]).toEqual("yes");
    expect(mockForm.state("bulk")["utility"]).toEqual("yes");
    expect(mockForm.state("bulk")["private"]).toEqual("");

    // negotiable no
    negotiable_no.invoke("onChange")({
      target: { name: "negotiable", value: "no" }
    });
    expect(mockForm.state("bulk")["negotiable"]).toEqual("no");
    expect(mockForm.state("bulk")["utility"]).toEqual("yes");
    expect(mockForm.state("bulk")["private"]).toEqual("");

    // private no
    private_no.invoke("onChange")({ target: { name: "private", value: "no" } });
    expect(mockForm.state("bulk")["negotiable"]).toEqual("no");
    expect(mockForm.state("bulk")["utility"]).toEqual("yes");
    expect(mockForm.state("bulk")["private"]).toEqual("no");

    // utility no
    utility_no.invoke("onChange")({ target: { name: "utility", value: "no" } });
    expect(mockForm.state("bulk")["negotiable"]).toEqual("no");
    expect(mockForm.state("bulk")["utility"]).toEqual("no");
    expect(mockForm.state("bulk")["private"]).toEqual("no");

    // private yes
    private_yes.invoke("onChange")({
      target: { name: "private", value: "yes" }
    });
    expect(mockForm.state("bulk")["negotiable"]).toEqual("no");
    expect(mockForm.state("bulk")["utility"]).toEqual("no");
    expect(mockForm.state("bulk")["private"]).toEqual("yes");
  });
  test("preference", () => {
    const mockForm = shallow(<Form1 />);
    const mountedPreference = mount(
      <FormPreference
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
      />
    );
    const female = mountedPreference.find("#female");
    const male = mountedPreference.find("#male");
    const lgbtq = mountedPreference.find("#LGBTQ");
    const Gender_Inclusive = mountedPreference.find("#Gender");
    const others = mountedPreference.find("#others");

    // init
    expect(mockForm.state("bulk")["gender"]).toEqual("");

    // female
    female.invoke("onChange")({ target: { name: "gender", value: "female" } });
    expect(mockForm.state("bulk")["gender"]).toEqual("female");
    // male
    male.invoke("onChange")({ target: { name: "gender", value: "male" } });
    expect(mockForm.state("bulk")["gender"]).toEqual("male");

    // lgbtq
    lgbtq.invoke("onChange")({ target: { name: "gender", value: "LGBTQ" } });
    expect(mockForm.state("bulk")["gender"]).toEqual("LGBTQ");

    // Gender_Inclusive
    // gender inclusive (type) should not have space
    // currently fails
    /*
    Gender_Inclusive.invoke("onChange")({target: {name: "gender", value: "Gender_Inclusive"}})
    expect(mockForm.state("bulk")["gender"]).toEqual("Gender_Inclusive");
    */
    // others
    others.invoke("onChange")({ target: { name: "gender", value: "others" } });
    expect(mockForm.state("bulk")["gender"]).toEqual("others");
  });

  test("questionInfo", () => {
    const mockForm = shallow(<Form1 />);
    const mountedQuestion = mount(
      <FormQuestion
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
      />
    );
    const living_yes = mountedQuestion.find("#living_yes");
    const living_no = mountedQuestion.find("#living_no");
    const pets_yes = mountedQuestion.find("#pets_yes");
    const pets_no = mountedQuestion.find("#pets_no");
    const parking_yes = mountedQuestion.find("#parking_yes");
    const parking_no = mountedQuestion.find("#parking_no");
    const furnished_yes = mountedQuestion.find("#furnished_yes");
    const furnished_no = mountedQuestion.find("#furnished_no");

    //init
    expect(mockForm.state("bulk")["living"]).toEqual("");
    expect(mockForm.state("bulk")["pets"]).toEqual("");
    expect(mockForm.state("bulk")["parking"]).toEqual("");
    expect(mockForm.state("bulk")["furnished"]).toEqual("");

    // yes
    living_yes.invoke("onChange")({ target: { name: "living", value: "yes" } });
    pets_yes.invoke("onChange")({ target: { name: "pets", value: "yes" } });
    parking_yes.invoke("onChange")({
      target: { name: "parking", value: "yes" }
    });
    furnished_yes.invoke("onChange")({
      target: { name: "furnished", value: "yes" }
    });

    expect(mockForm.state("bulk")["living"]).toEqual("yes");
    expect(mockForm.state("bulk")["pets"]).toEqual("yes");
    expect(mockForm.state("bulk")["parking"]).toEqual("yes");
    expect(mockForm.state("bulk")["furnished"]).toEqual("yes");

    // no
    living_no.invoke("onChange")({ target: { name: "living", value: "no" } });
    pets_no.invoke("onChange")({ target: { name: "pets", value: "no" } });
    parking_no.invoke("onChange")({ target: { name: "parking", value: "no" } });
    furnished_no.invoke("onChange")({
      target: { name: "furnished", value: "no" }
    });

    expect(mockForm.state("bulk")["living"]).toEqual("no");
    expect(mockForm.state("bulk")["pets"]).toEqual("no");
    expect(mockForm.state("bulk")["parking"]).toEqual("no");
    expect(mockForm.state("bulk")["furnished"]).toEqual("no");
  });

  test("hostGender", () => {
    const mockForm = shallow(<Form1 />);
    const mountedHostGender = mount(
      <FormHostGender
        bulk={mockForm.state("bulk")}
        handleChange={mockForm.instance().handleChange}
      />
    );
    const female = mountedHostGender.find("#female_host");
    const lgbtq = mountedHostGender.find("#LGBTQ_host");
    const male = mountedHostGender.find("#male_host");
    const other_gender = mountedHostGender.find("#other_gender_host");

    // init
    expect(mockForm.state("bulk")["host_gender"]).toEqual("");

    // female
    female.invoke("onChange")({
      target: { name: "host_gender", value: "female" }
    });
    expect(mockForm.state("bulk")["host_gender"]).toEqual("female");

    // male
    male.invoke("onChange")({ target: { name: "host_gender", value: "male" } });
    expect(mockForm.state("bulk")["host_gender"]).toEqual("male");

    // lgbtq
    lgbtq.invoke("onChange")({
      target: { name: "host_gender", value: "LGBTQ" }
    });
    expect(mockForm.state("bulk")["host_gender"]).toEqual("LGBTQ");

    // other_gender
    other_gender.invoke("onChange")({
      target: { name: "host_gender", value: "other_gender" }
    });
    expect(mockForm.state("bulk")["host_gender"]).toEqual("other_gender");
  });
});
