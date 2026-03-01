export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.truckersmp.com/v2/vtc/65092/events"
    );

    const data = await response.json();

    const now = new Date();

    // Filter upcoming events (same as your PHP)
    const upcoming_events =
      data?.response?.filter(event =>
        new Date(event.start_at) > now
      ) || [];

    // Cache (optional but recommended)
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return res.status(200).json({
      error: false,
      upcoming_events
    });

  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Failed to fetch TruckersMP events"
    });
  }
}
