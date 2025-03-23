use alloy_sol_types::sol;
use geo::{algorithm::contains::Contains, Point, Polygon};
use json::{parse, JsonValue};


sol! {
    /// The public values encoded as a struct that can be easily deserialized inside Solidity.
    struct PublicValuesStruct {
        bytes32 user_data_hash;
        bytes32 criteria_hash;
    }
}

/// Compute the n'th fibonacci number (wrapping around on overflows), using normal Rust code.
pub fn check_target_user(user_data: String, criteria: String) -> bool {
    let user_data = parse(&user_data).unwrap();
    let criteria = parse(&criteria).unwrap();

    // Gather user data from JSON
    let age: u32 = user_data["age"].as_u32().unwrap();
    let coordinates: Vec<f64> = match user_data["coordinates"].clone() {
        JsonValue::Array(c) => c.iter().map(|x| x.as_f64().unwrap()).collect(),
        _ => panic!("Coordinates not found."),
    };
    let history: Vec<String> = match user_data["history"].clone() {
        JsonValue::Array(h) => h.iter().map(|x| x.as_str().unwrap().to_string()).collect(),
        _ => panic!("History not found."),
    };

    // Gather criteria from JSON
    let age_range: Vec<u32> = match criteria["age_range"].clone() {
        JsonValue::Array(a) => a.iter().map(|x| x.as_u32().unwrap()).collect(),
        _ => panic!("Age range not found."),
    };
    let geofence: Vec<Vec<f64>> = match criteria["geofence"].clone() {
        JsonValue::Array(g) => g
            .iter()
            .map(|x| match x {
                JsonValue::Array(a) => a.iter().map(|y| y.as_f64().unwrap()).collect(),
                _ => panic!("Geofence not found."),
            })
            .collect(),
        _ => panic!("Geofence not found."),
    };
    let target_domains: Vec<String> = match criteria["target_domains"].clone() {
        JsonValue::Array(t) => t.iter().map(|x| x.as_str().unwrap().to_string()).collect(),
        _ => panic!("Target domains not found."),
    };

    // Check age range.
    if age < age_range[0] || age > age_range[1] {
        panic!(
            "Out of age range: {} not in {} to {}",
            age, age_range[0], age_range[1]
        );
    }

    // Check that user is in geofence.
    let polygon = Polygon::new(
        geofence.iter().map(|x| Point::new(x[0], x[1])).collect(),
        vec![],
    );
    let point = Point::new(coordinates[0], coordinates[1]);
    if !polygon.contains(&point) {
        panic!("User is not in geofence.");
    }

    // Check that user has visited target domains.
    for domain in target_domains {
        if !history.contains(&domain) {
            panic!("User has not visited domain: {}", domain);
        }
    }

    println!("All checks passed.");
    true
}
