// swift-tools-version:5.5
import PackageDescription

let package = Package(
    name: "YextAnalytics",
    platforms: [
        .iOS(.v13),
        .macOS(.v10_15),
        .tvOS(.v13),
        .watchOS(.v6)
    ],
    products: [
        .library(
            name: "YextAnalytics",
            targets: ["YextAnalytics"]
        ),
    ],
    dependencies: [],
    targets: [
        .target(
            name: "YextAnalytics",
            dependencies: []
        ),
        .testTarget(
            name: "YextAnalyticsTests",
            dependencies: ["YextAnalytics"]
        ),
    ]
)