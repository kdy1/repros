use anyhow::Result;
use glob::glob;
use std::path::PathBuf;

const PATTERN: &str = "./cli/**/__tests__/**";

fn main() -> Result<()> {
    {
        let values = glob(PATTERN)?;
        dbg!(&values);

        for value in values {
            dbg!(&value);
        }
    }

    {
        let pattern: Vec<PathBuf> = glob(PATTERN)?.filter_map(|p| dbg!(p).ok()).collect();

        dbg!(&pattern);
    }

    Ok(())
}
